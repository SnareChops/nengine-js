import { Image } from '../image';
import { panic } from '../panic';
import { createCanvas } from '../util';

const sheetCache = new Map<string, TileSheet>();

export class SheetSource {
    #url: string;
    #index: number;
    constructor(url: string, index: number) {
        this.#url = url;
        this.#index = index;
    }
    alias(): string {
        return this.#url;
    }
    index(): number {
        return this.#index;
    }
    image(): Image | undefined {
        return imageFromSheet(this.#url, this.#index);
    }
}

export class TileSheet {
    url: string;
    images: Image[];
    sheetWidth: number;
    sheetHeight: number;
    cellWidth: number;
    cellHeight: number;

    constructor(url: string, sheetWidth: number, sheetHeight: number, cellWidth: number, cellHeight: number, images: Image[]) {
        this.url = url;
        this.sheetWidth = sheetWidth;
        this.sheetHeight = sheetHeight;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.images = images;
    }

    rowLen(): number {
        return Math.floor(this.sheetWidth / this.cellWidth);
    }
    colLen(): number {
        return Math.floor(this.sheetHeight / this.cellHeight);
    }
    sources(): SheetSource[] {
        const sources: SheetSource[] = [];
        for (const [index, _] of this.images.entries()) {
            sources.push(new SheetSource(this.url, index));
        }
        return sources;
    }
}

export async function addSheet(url: string, cellWidth?: number, cellHeight?: number): Promise<void> {
    const sheet = await loadSheet(url, cellWidth, cellHeight);
    if (!!sheet) {
        sheetCache.set(url, sheet);
    }
}

export function getSheets(): Map<string, TileSheet> {
    return sheetCache;
}

export function getSheet(url: string): TileSheet | undefined {
    return sheetCache.get(url);
}

export function getSheetRange(url: string, start: number, end: number): Image[] {
    return getSheet(url)?.images.slice(start, end) || [];
}

export function imageFromSheet(url: string, index: number): Image | undefined {
    return getSheet(url)?.images[index];
}
export function loadSheet(url: string, cellWidth?: number, cellHeight?: number): Promise<TileSheet | undefined> {
    return new Promise(resolve => {
        const image = new Image();
        image.src = url;
        image.onerror = (event, source, lineno, colno, err) => {
            panic('Error loading image', err, `${source}:${lineno}:${colno}`, event);
            resolve(void 0);
        };
        image.addEventListener('load', event => {
            let width = cellWidth || 0;
            let height = cellHeight || 0;
            if (!cellWidth && !cellHeight) {
                const [valid, w, h] = detectCellSize(url);
                if (!valid) {
                    panic('Could not auto-detect tilesheet cell size. Ensure the filename is only letters, followed by the size of the cells as numbers to use this feature. Alternatively, pass the cell size as arguments to loadSheet(). (ex: MySheet32.png, or NonSquareCells32x64.png)');
                    resolve(void 0);
                }
                width = w;
                height = h;
            }
            // Split sheet into separate images
            const images = splitSheetIntoImages(event.target as HTMLImageElement, width, height);
            resolve(new TileSheet(
                url,
                (event.target as HTMLImageElement).width,
                (event.target as HTMLImageElement).height,
                width,
                height,
                images,
            ));
        });
    });
}

function splitSheetIntoImages(sheet: Image, cellWidth: number, cellHeight: number): Image[] {
    const images: Image[] = [];
    const cols = Math.floor(sheet.width / cellWidth);
    const rows = Math.floor(sheet.height / cellHeight);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * cellWidth;
            const y = row * cellHeight;
            const [image, context] = createCanvas(cellWidth, cellHeight);
            context.drawImage(sheet, x, y, cellWidth, cellHeight, 0, 0, cellWidth, cellHeight);
            images.push(image);
        }
    }
    return images;
}

function detectCellSize(url: string): [boolean, number, number] {
    const match = /([a-zA-Z0-9_\/\\]+?)(\d+)x?(\d+)?/.exec(url);
    if (!match) return [false, 0, 0];
    if (match.length < 3) return [false, 0, 0];
    const width = Number(match[2]);
    if (isNaN(width)) return [false, 0, 0];
    let height: number = width;
    if (match.length === 4) {
        const h = Number(match[3]);
        if (!isNaN(h)) height = h;
    }
    return [true, width, height];
}