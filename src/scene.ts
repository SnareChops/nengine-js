export interface Scene {
    update(delta: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
}