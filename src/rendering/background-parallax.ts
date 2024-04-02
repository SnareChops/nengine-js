import { Raw } from '../bounds/raw';
import { Image, Context } from '../image';
import { BasicCamera } from './camera-basic';

export class ParallaxBackground extends Raw {
    #camera: BasicCamera;
    #order: number;
    #worldWidth: number;
    #worldHeight: number;
    #image: Image;

    constructor(order: number, viewWidth: number, viewHeight: number, worldWidth: number, worldHeight: number, image: Image) {
        super(image.width, image.height);
        this.#order = order;
        this.#worldWidth = worldWidth;
        this.#worldHeight = worldHeight;
        this.#image = image;
        this.#camera = new BasicCamera(viewWidth, viewHeight, image.width, image.height);
    }
    /** ParallaxBackground rendering order */
    order(): number {
        return this.#order;
    }

    update(x: number, y: number, delta: number) {
        const xp = x / this.#worldWidth;
        const yp = y / this.#worldHeight;
        x = Math.floor(this.dx() * xp);
        y = Math.floor(this.dy() * yp);
        this.#camera.setPos(x, y);
    }

    draw(screen: Context) {
        screen.drawImage(this.#image, ...this.#camera.view(), 0, 0, ...this.#camera.viewSize());
    }
}