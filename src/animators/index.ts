export interface Animator {
    start(name: string): void;
    update(delta: number): void;
    image(): CanvasRenderingContext2D;
}
