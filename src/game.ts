export interface Game {
    update(delta: number);
    draw(context: CanvasRenderingContext2D);
}