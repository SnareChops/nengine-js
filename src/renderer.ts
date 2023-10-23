import { Camera } from './camera';
import { Debug } from './debug';
import { cursorPosition } from './mouse';
import { Sprite } from './sprite';

/**
 * Renderer is a utility for managing your sprites using the different
 * coordinate systems and the Camera to produce a final image that is
 * drawn on the screen.
 * This is really only needed for Scenes that are larger than the screen and/or
 * use the Camera.
 * For simple Scenes that don't use these features, it's recommended to implement
 * a simpler Draw() function in the Scene rather than use the Renderer
 */
export class Renderer {
    #background: Sprite[] = [];
    #screen: Sprite[] = [];
    #world: Sprite[] = [];
    #debug: Debug | undefined;
    #camera: Camera;

    constructor(viewWidth: number, viewHeight: number, worldWidth: number = viewWidth, worldHeight: number = viewHeight, debug?: Debug) {
        this.#camera = new Camera(viewWidth, viewHeight, worldWidth, worldHeight);
        this.#debug = debug;
        if (!!debug) {
            debug.addStat('Screen', () => {
                const [x, y] = cursorPosition();
                return `${x}, ${y}`;
            });
            debug.addStat('World', () => {
                const [x, y] = this.cursorWorldPosition();
                return `${x.toFixed(2)}, ${y.toFixed(2)}`;
            });
        }
    }

    /** Gets the world position of the cursor */
    cursorWorldPosition(): [x: number, y: number] {
        return this.#camera.screenToWorldPos(...cursorPosition());
    }
    /** Adds the sprite to the background layer */
    addToBackground(sprite: Sprite) {
        if (this.#background.includes(sprite)) return;
        this.#screen.push(sprite);
    }
    /** Removes the sprite from the background layer */
    removeFromBackground(sprite: Sprite) {
        const i = this.#background.indexOf(sprite);
        if (i > -1) this.#background.splice(i, 1);
    }
    /** Adds the sprite to the world layer */
    addToWorld(sprite: Sprite) {
        if (this.#world.includes(sprite)) return;
        this.#world.push(sprite);
    }
    /** Removes the sprite from the world layer */
    removeFromWorld(sprite: Sprite) {
        const i = this.#world.indexOf(sprite);
        if (i > -1) this.#world.splice(i, 1);
    }
    /** Adds the sprite to the screen layer */
    addToScreen(sprite: Sprite) {
        if (this.#screen.includes(sprite)) return;
        this.#screen.push(sprite);
    }
    /** Removes the sprite from the screen layer */
    removeFromScreen(sprite: Sprite) {
        const i = this.#screen.indexOf(sprite);
        if (i > -1) this.#screen.splice(i, 1);
    }
    /** Sets the camera position */
    setCameraPos(x: number, y: number) {
        this.#camera.setPos(x, y);
    }
    drawSprite(ctx: CanvasRenderingContext2D, sprite: Sprite) {
        const image = sprite.image();
        if (sprite.rotation() != 0) {
            ctx.translate(...sprite.mid());
            ctx.rotate(sprite.rotation());
            ctx.drawImage(image, -sprite.dx() / 2, -sprite.dy() / 2, sprite.dx(), sprite.dy());
            ctx.resetTransform();
        } else {
            ctx.drawImage(image, ...sprite.rawPos(), sprite.dx(), sprite.dy());
        }
    }
    /**
     * Draw the result of the Renderer processing to the provided image
     * (usually the screen)
     */
    draw(ctx: CanvasRenderingContext2D) {
        this.#background.sort((a, b) => a.z() - b.z());
        for (const item of this.#background) {
            this.drawSprite(ctx, item);
        }
        // Draw world layer
        this.#world.sort((a, b) => a.y() - b.y());
        for (const item of this.#world) {
            this.drawSprite(ctx, item);
        }
        // Draw screen layer
        this.#screen.sort((a, b) => a.z() - b.z());
        for (const item of this.#screen) {
            this.drawSprite(ctx, item);
        }
        // Draw debug layer
        if (!!this.#debug) this.#debug.draw(ctx);
    }
}