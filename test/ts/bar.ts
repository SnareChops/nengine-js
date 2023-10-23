import { RawBounds, LEFT, CENTER, createCanvas } from '../../src';

export abstract class Bar extends RawBounds {
    barImage: CanvasImageSource;
    barContext: OffscreenCanvasRenderingContext2D;

    color: string;
    currentValue: number;

    bounds: Array<number> = new Array<number>(2);

    constructor(w: number, h: number, color: string) {
        super(w, h);

        this.color = color;
        [this.barImage, this.barContext] = createCanvas(w, h)

        this.setAnchor(LEFT, CENTER);
    }

    render() {
        this.barContext.reset();

        this.barContext.rect(0, 0, this.bounds[1], this.height());
        this.barContext.fillStyle = this.color;
        this.barContext.fill();

        this.barContext.lineWidth = 5;
        this.barContext.strokeStyle = "black";
        this.barContext.stroke();
    }

    abstract update(percent: number): void;
}

export class DynamicBar extends Bar {

    constructor(w: number, h: number, color: string) {
        super(w, h, color);

        this.bounds = [0, 255];

        this.render();
    }

    render(): void {
        this.barContext.reset();
        this.barContext.rect(0, 0, this.currentValue, this.height());
        this.barContext.fillStyle = this.color;
        this.barContext.fill();

        this.barContext.lineWidth = 5;
        this.barContext.strokeStyle = "black";
        this.barContext.strokeRect(0, 0, ...this.size());
    }

    update(value: number): void {
        this.currentValue = value;
    }

    image(): CanvasImageSource {
        return this.barImage;
    }
}

