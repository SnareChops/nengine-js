import { Context } from './image';
import { panic } from './panic';
import { createCanvas } from './util';

interface CachedSheet {
    cellWidth: number;
    cellHeight: number;
    images: ImageBitmap[];
}

let sheetCache = new Map<string, CachedSheet>();

export interface NamedSheet {
    name: string;
    url: string;
    cellWidth: number;
    cellHeight: number;
}

/**
 * Initializes and loads spritesheet images
 * This is the recommended way to use images from spritesheets.
 * Use `imageFromSheet()` or `imagesFromSheet()` to retrieve the
 * images in a synchronous way.
 * 
 * Tip: It is recommended to call this function before starting the
 * engine. Once the promise resolves, all images are cached and ready
 * to be accessed.
 * 
 * PanicMode: Because this function is recommended to be called before
 * starting the engine. If you want the benefits of PanicMode then be
 * sure to `enablePanicMode()` **before** calling this function.
 * PanicMode: This promise will panic if an error occurs while attempting
 * to load an image.
 * PanicMode: This promise will panic if unable to extract cell images from
 * the spritesheet.
 * 
 * NormalMode: If an image fails to load, an error will be logged to the
 * console, however an entry into the sheet cache will not be created.
 * NormalMode: If unable to extract the images from this spritesheet, an
 * entry will not be made in the sheet cache.
 * NormalMode: Either of these will most likely cause a call to 
 * `imageFromSheet()` or `imagesFromSheet()` to return `undefined` later
 * in program execution.
 */
export async function initSheets(sheets: NamedSheet[]): Promise<void> {
    const raws = await Promise.all(sheets.map(sheet => loadImage(sheet.url)));
    for (const [i, image] of raws.entries()) {
        if (!image) continue;
        const cellWidth = sheets[i].cellWidth;
        const cellHeight = sheets[i].cellHeight;
        const [canvas, context] = createCanvas(image.width, image.height, true);
        context.drawImage(image, 0, 0);
        const images = await extractCellImages(canvas, context, cellWidth, cellHeight);
        if (!images) continue;
        sheetCache.set(sheets[i].name, { cellWidth, cellHeight, images });
    }
}
/**
 * Loads an image from a url.
 * 
 * PanicMode: This promise will panic if an error occurs while attempting
 * to load an image.
 * 
 * NormalMode: This promise will return `undefined` if an error occurs while
 * attempting to load an image.
 */
export async function loadImage(url: string): Promise<HTMLImageElement | undefined> {
    return new Promise(resolve => {
        const image = new Image();
        image.src = url;
        image.onerror = (event, source, lineno, colno, err) => {
            panic('Error loading image', err, `${source}:${lineno}:${colno}`, event);
            resolve(void 0);
        };
        image.addEventListener('load', event => resolve(event.target as HTMLImageElement));
    });
}

/**
 * Load a spritesheet from a url.
 * 
 * Tip: This is not the recommended way to get sprites from a spritesheet.
 * Recommended to use `initSheets()` and `imagesFromSheet()` instead
 * 
 * PanicMode: This promise will panic if an error occurs while attempting
 * to load an image.
 * PanicMode: This promise will panic if unable to extract cell images from
 * the spritesheet.
 * 
 * NormalMode: This promise will return `undefined` if an error occurs while
 * attempting to load an image.
 * NormalMode: This promise will return `undefined` if unable to extract
 * the images from this spritesheet.
 */
export async function loadSpriteSheet(url: string, cellWidth: number, cellHeight: number): Promise<ImageBitmap[] | undefined> {
    const image = await loadImage(url);
    if (!image) return void 0;
    const [canvas, context] = createCanvas(image.width, image.height, true);
    context.drawImage(image, 0, 0);
    return await extractCellImages(canvas, context, cellWidth, cellHeight);
}

/**
 * Gets a specific sprite from a spritesheet.
 * This is the recommended way to get a single sprite from a spritesheet.
 * Note: Ensure you've used `initSheets()` to seed the spritesheet.
 * 
 * Tip: Use this function to get a single image from a spritesheet.
 * If you need multiple images, use `imagesFromSheet()` instead.
 * 
 * PanicMode: Guaranteed return an image, or panic.
 * PanicMode: This function will panic if attempting to retrieve an image
 * from a sheet that has not been loaded with `initSheet()`.
 * PanicMode: This function will panic index is out of bounds.
 * 
 * NormalMode: This function will return `undefined` if no cached spritesheet
 * is found.
 * NormalMode: This function will return `undefined` if index is out of bounds.
 */
export function imageFromSheet(name: string, idx: number): ImageBitmap | undefined {
    const sheet = sheetCache.get(name);
    if (!sheet) {
        panic('Expected', name, 'to exist in sheetCache');
        return void 0;
    }
    if (idx < 0 || idx >= sheet.images.length) {
        panic('Index', idx, 'out of bounds for sheet', name, 'length', sheet.images.length);
        return void 0;
    }
    return sheetCache.get(name)!!.images[idx];
}

/**
 * Gets ALL images from a spritesheet.
 * This is the recommended way to get images from a spritesheet.
 * Note: Ensure you've used `initSheets()` to seed the spritesheet.
 * 
 * Tip: Use this function to get multiple images from a spritesheet.
 * If you only need one, use `imageFromSheet()` instead.
 * 
 * PanicMode: Guaranteed to return images, or panic.
 * PanicMode: This function will panic if attempting to retrieve images
 * from a sheet that has not been loaded with `initSheet()`.
 * 
 * NormalMode: This function will return `undefined` if no cached
 * spritesheet is found.
 */
export function imagesFromSheet(name: string): ImageBitmap[] | undefined {
    const result = sheetCache.get(name)?.images;
    if (!result) panic('Expected', name, 'to exist in sheetCache');
    return result;
}

// PanicMode: panics if cannot createImageBitmap
// NormalMode: returns `undefined` if cannot createImageBitmap
async function extractCellImages(canvas: HTMLCanvasElement | HTMLImageElement | OffscreenCanvas, context: Context, cellWidth: number, cellHeight: number): Promise<ImageBitmap[] | undefined> {
    const cols = canvas.width / cellWidth;
    const rows = canvas.height / cellHeight;
    const images: ImageBitmap[] = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const data = context.getImageData(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
            const bitmap = await createImageBitmap(data);
            if (!bitmap) {
                panic('Unable to createImageBitmap from', canvas);
                return void 0;
            }
            images.push(bitmap);
        }
    }
    return images;
}