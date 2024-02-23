import { Raw } from '../bounds/raw';
import { Sprite } from '../types/sprite';
import { Camera } from '../types/camera';
import { Context, debugStat } from '..';

/** A RenderLayer for drawing sprites using world coordinates */
export class World extends Raw {
    #camera: Camera;
    #order: number = 0;
    #sprites: Sprite[] = [];

    constructor(order: number, camera: Camera) {
        super(...camera.worldSize());
        this.#order = order;
        this.#camera = camera;
        debugStat("World", () => {
            const [x, y] = this.#camera.cursorWorldPosition();
            return `${x}, ${y}`;
        });
    }
    /** World rendering order */
    order(): number {
        return this.#order;
    }
    /** Get all sprites in the World */
    sprites(): Sprite[] {
        return this.#sprites;
    }
    /** Add a sprite to the World */
    addSprite(sprite: Sprite) {
        if (this.#sprites.includes(sprite)) return;
        this.#sprites.push(sprite);
    }
    /** Remove sprite from the World */
    removeSprite(sprite: Sprite) {
        if (!this.#sprites.includes(sprite)) return;
        this.#sprites.splice(this.#sprites.indexOf(sprite), 1);
    }
    /** Draws the World */
    draw(ctx: Context) {
        this.#sprites.sort((a, b) => a.y() - b.y());
        for (const sprite of this.#sprites) {
            const image = sprite.image();
            if (!!image) {
                ctx.drawImage(image, ...sprite.rawPos());
            }
        }
    }
}