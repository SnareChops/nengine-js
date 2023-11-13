import { Image } from '../image';

interface backgroundPiece {
    image: Image;
    x: number;
    y: number;
}

/**
 * Background represents an assortment of images to use for
 * the background in the Renderer
 * This is different than world and screen concepts because of image
 * size limitations with the ebitengine library
 * Consider using ChunkImage() or ChunkBounds() if needed to split a large image
 * or area into smaller pieces
 */
export class Background {
    #pieces: backgroundPiece[] = [];

    /** Clear the background */
    clearBackground() {
        this.#pieces = [];
    }
    /** Add an image to the Background at the provided offset using world coordinates */
    addBackgroundImage(image: Image, offsetX: number, offsetY: number) {
        this.#pieces.push({ image, x: offsetX, y: offsetY });
    }
}

