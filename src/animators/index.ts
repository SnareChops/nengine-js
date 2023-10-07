export interface Animator {
    start(name: string);
    update(delta: number);
    image(): CanvasRenderingContext2D;
}
