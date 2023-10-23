/** Draws text to the canvas */
export function drawText(context: CanvasRenderingContext2D, x: number, y: number, text: string, font: string, color: string, maxWidth?: number) {
    context.font = font;
    context.fillStyle = color;
    context.fillText(text, x, y, maxWidth);
}