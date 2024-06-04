import { Context, Image } from '../image';
import { createCanvas } from '../util';
import { BasicCamera } from './camera-basic';

export class BufferedCamera extends BasicCamera {
    #image: Image;
    #context: Context;

    constructor(viewWidth: number, viewHeight: number, worldWidth: number, worldHeight: number) {
        super(viewWidth, viewHeight, worldWidth, worldHeight);
        [this.#image, this.#context] = createCanvas(viewWidth, viewHeight);
    }

    image(source: Image): Image {
        this.#context.reset();
        this.#context.drawImage(source, ...this.view(), 0, 0, ...this.size());
        return this.#image;
    }
}