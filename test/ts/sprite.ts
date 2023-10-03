import { RawBounds } from "../../src/bounds";
import { createCanvas } from "../../src/util";

export class TestSprite extends RawBounds {
    #image: CanvasImageSource;
    constructor() {
        super(500, 500);
        const [canvas, context] = createCanvas(500, 500);
        context.fillStyle = 'red';
        context.fillRect(0, 0, 500, 500);
        this.#image = canvas;
    }

    image(): CanvasImageSource {
        return this.#image;
    }
}