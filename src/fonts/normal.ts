import { Color } from '../color';
import { Context } from '../image';

/** Draws text to the canvas */
export function drawText(context: Context, x: number, y: number, text: string, font: string, color: Color, maxWidth?: number) {
    context.font = font;
    context.fillStyle = color.hex();
    context.fillText(text, x, y, maxWidth);
}