import { Image } from '../src/image';
import { createCanvas } from '../src/util';

export function makeButtons(sheet: string, width: number, start: number, end: number): Image[] {
    const tiles = getSheet(sheet);
    const frames: Image[] = [];
    for (let i = 0; i < end - start; i += 3) {
        frames.push(makeButton(tiles, width, start + i, start + i + 3));
    }
    return frames;
}

export function makeButton(sheet: TileSheet, width: number, start: number, end: number): Image {
    const [frame, context] = createCanvas(width, sheet.cellHeight);
    const pieces = sheet.images.slice(start, end);
    context.drawImage(pieces[0], 0, 0);
    const times = Math.floor((width - sheet.cellWidth * 2) / sheet.cellWidth);
    for (let i = 0; i < times; i++) {
        context.drawImage(pieces[1], i * sheet.cellWidth + sheet.cellWidth, 0);
    }
    const remaining = Math.floor((width - sheet.cellWidth * 2) % sheet.cellWidth);
    if (remaining !== 0) {
        context.drawImage(pieces[1], 0, 0, remaining, pieces[1].height, width - remaining - sheet.cellWidth, 0, remaining, pieces[1].height);
    }
    context.drawImage(pieces[2], width - sheet.cellWidth, 0);
    return frame;
}