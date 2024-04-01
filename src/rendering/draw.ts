import { Context, Image } from '../image';

function drawAt(dest: Context, src: Image, x: number, y: number) {
    dest.drawImage(src, x, y);
}

function gridDraw(dest: Context, cell: Image, index: number) {
    const width = dest.canvas.width;
    const x = index % width;
    const y = Math.floor(index / width);
    dest.drawImage(cell, x * cell.width, y * cell.height);
}