import { Color } from '../color';

/** Draws text to the canvas */
export function drawText(context: CanvasRenderingContext2D, x: number, y: number, text: string, font: string, color: Color, maxWidth?: number) {
    context.font = font;
    context.fillStyle = color.hex();
    context.fillText(text, x, y, maxWidth);
}