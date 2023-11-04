import { Color } from '.';
import { Context } from './image';

/** Represents a line */
export class Line {
    constructor(public x1: number, public y1: number, public x2: number, public y2: number) { }
}

/** Draws a line to the provided context */
export function drawLine(ctx: Context, line: Line, size: number, color: Color) {
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.strokeStyle = color.hex();
    ctx.lineWidth = size;
    ctx.stroke();
}