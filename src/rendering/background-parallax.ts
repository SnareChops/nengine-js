import { Raw } from '../bounds/raw';
import { Context, Image } from '../image';
import { BasicCamera } from './camera-basic';

/** 
 * Represents a Background that can be used to create a parallax effect
 * Note: This is also a RenderLayer that can be used with the Renderer
 */
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
    /** RenderLayer ordering */
    order(): number {
        return this.#order;
    }
    /** Update the background */
    update(x: number, y: number) {
        const xp = x / this.#worldWidth;
        const yp = y / this.#worldHeight;
        x = Math.floor(this.dx() * xp);
        y = Math.floor(this.dy() * yp);
        this.#camera.setPos(x, y);
    }
    /** Draw the background to the provided context */
    draw(screen: Context) {
        screen.drawImage(this.#image, ...this.#camera.view(), 0, 0, ...this.#camera.viewSize());
    }
}