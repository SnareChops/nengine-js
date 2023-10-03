export interface Scene {
    update(delta: number);
    draw(ctx: CanvasRenderingContext2D);
}