export interface Game {
    update(delta: number): void;
    draw(context: CanvasRenderingContext2D): void;
}