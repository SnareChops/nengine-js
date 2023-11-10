import { Bounds } from '../types/bounds';
import { Raw } from './raw';

export class Relative extends Raw {
    #parent: Bounds;

    constructor(parent: Bounds, width: number = 0, height: number = 0) {
        super(width, height);
        this.#parent = parent;
    }
    /** Gets the absolute x,y of the top left corner of the bounds (relative to the parent) */
    rawPos(): [x: number, y: number] {
        const [px, py] = this.#parent.xy();
        const [x, y] = this.xy();
        const [ox, oy] = this.offset();
        return [px + x - ox, py + y - oy];
    }
}