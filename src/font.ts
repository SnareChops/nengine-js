import { Bounds } from './bounds';
import { createCanvas } from './util';

interface Font {
    height: number;
    data: Map<number, Char>;
}

interface Char {
    width: number;
    pixels: boolean[];
}

export let Font5: Font;
export let Font10: Font;
export let Font15: Font;
export let Font20: Font;

export async function initFonts() {
    return new Promise<void>((resolve, reject) => {
        const png = new Image();
        png.src = `assets/Fonts.png`;
        png.addEventListener('load', event => {
            const image = event.target as HTMLImageElement;
            const [canvas, context] = createCanvas(image.naturalWidth, image.naturalHeight);
            context.drawImage(image, 0, 0);
            Font5 = loadFontFromImage(1, 5, context);
            Font10 = loadFontFromImage(7, 10, context);
            Font15 = loadFontFromImage(18, 15, context);
            Font20 = loadFontFromImage(34, 20, context);
            resolve();
        });
    });
}

function loadFontFromImage(start: number, height: number, context: CanvasRenderingContext2D): Font {
    const font = {
        height: height,
        data: new Map(),
    };
    let cursor = 0;
    for (let ascii = 32; ascii < 127; ascii++) {
        cursor += 1
        const begin = cursor;
        while (true) {
            const [r, g, b, a] = context.getImageData(cursor, start, 1, 1).data;
            if (g == 255) break;
            cursor += 1;
        }
        font.data.set(ascii, {
            width: cursor - begin,
            pixels: extractPixels(context, begin, start, cursor, start + height),
        });
    }
    return font;
}

function extractPixels(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): boolean[] {
    const result: boolean[] = [];
    for (let y = y1; y < y2; y++) {
        for (let x = x1; x < x2; x++) {
            const [r, g, b, a] = context.getImageData(x, y, 1, 1).data;
            result.push(r == 255);
        }
    }
    return result;
}

export interface Letter {
    image: ImageBitmap;
    char: number;
}

export function drawStringBlock(dest: CanvasRenderingContext2D, bounds: Bounds, kerning: number, leading: number, lines: Letter[][]) {
    const [x, y] = bounds.vec2();
    for (let i = 0; i < lines.length; i++) {
        drawString(dest, x, y + (i * (leading + lines[i][0].image.height)), kerning, lines[i]);
    }
}

export function drawString(dest: CanvasRenderingContext2D, x: number, y: number, kerning: number, letters: Letter[]) {
    let cursor = 0;
    for (const letter of letters) {
        dest.drawImage(letter.image, x + cursor, y);
        cursor += letter.image.width + kerning;
    }
}

export async function imagesForString(text: string, font: Font, color: [number, number, number, number]): Promise<Letter[][]> {
    const result: Letter[][] = [];
    let line: Letter[] = [];
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        if (char == 10) {
            result.push(line);
            line = [];
            continue;
        }
        if (char < 32 || char > 127) {
            console.log('Skipped generating image for unsupported rune', char);
            continue;
        }
        const c = font.data.get(char);
        if (!!c) {
            const pixels = pixelsForLetter(font.height, c.pixels, color)
            const bitmap = await createImageBitmap(new ImageData(pixels, c.width))
            line.push({ image: bitmap, char: char });
        }
    }
    if (line.length > 0) {
        result.push(line);
    }
    return result;
}

function pixelsForLetter(width: number, pixels: boolean[], color: [number, number, number, number]): Uint8ClampedArray {
    const letter = new Uint8ClampedArray(pixels.length * 4);
    for (let i = 0; i < pixels.length; i++) {
        if (pixels[i]) {
            letter[i * 4] = color[0];
            letter[i * 4 + 1] = color[1];
            letter[i * 4 + 2] = color[2];
            letter[i * 4 + 3] = color[3];
        }
    }
    return letter;
}

export function measureString(kerning: number, leading: number, lines: Letter[][]): [number, number] {
    let maxWidth = 0;
    let height = -leading;
    let h = 0;
    for (const line of lines) {
        let width = -kerning;
        for (const letter of line) {
            width += kerning + letter.image.width;
            if (letter.image.height > 0) {
                h = letter.image.height;
            }
        }
        if (width > maxWidth) {
            maxWidth = width;
        }
        height += leading + h;
    }
    return [maxWidth, height];
}

export function wrap(bounds: Bounds, kerning: number, leading: number, lines: Letter[][]) {
    const result: Letter[][] = [];
    let currLine: Letter[] = [];
    let currWidth = -kerning;
    for (const line of lines) {
        for (const letter of line) {
            currWidth += kerning + letter.image.width;
            currLine.push(letter);
            if (currWidth > bounds.width()) {
                for (let i = currLine.length - 1; i > 0; i--) {
                    if (currLine[i].char == 32) {
                        result.push(currLine.slice(0, i));
                        currLine = currLine.slice(i + 1);
                        currWidth = -kerning;
                        for (const l of currLine) {
                            currWidth += kerning + l.image.width;
                        }
                        break;
                    }
                }
            }
        }
        if (currLine.length > 0) {
            result.push(currLine);
            currLine = [];
            currWidth = -kerning;
        }
    }
    return result;
}