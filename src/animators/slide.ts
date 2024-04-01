import type { Image } from '../image';
import { clamp } from '../utils';

export class SlideAnimator {
    #slider: number = 0;
    #duration: number = 0;
    #frame: number = 0;
    #frames: Image[];

    constructor(duration: number, frames: Image[]) {
        this.#frames = frames;
        this.#duration = duration;
    }

    update(advance: boolean, delta: number): boolean {
        const prev = this.#frame;
        if (advance) {
            this.#frame += delta;
        } else {
            this.#frame -= delta;
        }
        this.#slider = clamp(this.#slider, 0, this.#duration);
        this.#frame = Math.floor(this.#slider / this.#duration * (this.#frames.length - 1));
        return prev != this.#frame;
    }

    image(): Image {
        return this.#frames[this.#frame];
    }
}