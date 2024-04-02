import { Camera } from '../types/camera';
import { Raw } from '../bounds/raw';
import { Context, Image } from '../image';

interface backgroundPiece {
    image: Image;
    x: number;
    y: number;
}

/**
 * Background represents an assortment of images to use a 
 * background
 * Consider using ChunkImage() or ChunkBounds() if needed to
 * split a large image into smaller pieces
 */
export class Background extends Raw {
    #pieces: backgroundPiece[] = [];
    #camera: Camera;
    #order: number;

    constructor(order: number, w: number, h: number, camera: Camera) {
        super(w, h);
        this.#order = order;
        this.#camera = camera;
    }
    /** Background rendering order */
    order(): number {
        return this.#order;
    }
    /** Clear the background */
    clearBackground() {
        this.#pieces = [];
    }
    /** Add an image to the Background at the provided offset using world coordinates */
    addBackgroundImage(image: Image, offsetX: number, offsetY: number) {
        this.#pieces.push({ image, x: offsetX, y: offsetY });
    }
    /** Draw the Background to the screen */
    draw(screen: Context) {
        for (const piece of this.#pieces) {
            if (piece.image) {
                const [x, y] = this.#camera.worldToScreenPos(piece.x, piece.y);
                screen.drawImage(piece.image, x, y);
            }
        }
    }
}

