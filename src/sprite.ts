import { loadImage } from './assets';
import { Bounds, RawBounds } from './bounds';
import { Image } from './image';
import { panic } from './panic';

/**
 * Implement this interface to form a "sprite" that
 * the renderer can draw automatically
 */
export interface Sprite extends Bounds {
    image(): Image;
}

/**
 * SimpleSprite is a convenience struct for
 * "just drawing a raw image to the screen"
 * Note: Unless your intention is to just draw a
 * static image to the screen with no behavior then
 * it is **strongly** recommended to implement the
 * Sprite interface on your own instead of using this
 */
export class SimpleSprite extends RawBounds {
    #image: Image | undefined;
    /** Init sets the initial state of the SimpleStruct */
    constructor(image: string | Image) {
        super(0, 0);
        if (typeof image === 'string') {
            loadImage(image).then(img => {
                if (!img) console.error(panic('Failed to load image', image));
                else {
                    this.#image = img;
                    this.setSize(img.naturalWidth, img.naturalHeight);
                }
            });
        } else {
            this.#image = image;
            this.setSize(image.width, image.height);
        }
    }
    image(): Image | undefined {
        return this.#image;
    }
}