import { DebugTimer } from './timer';

/** Debug utility to measure time spent */
export class FrameTimer extends DebugTimer {
    #accumulator: number = 0;

    /** Ends the current measurement segment */
    end() {
        const delta = new Date().getTime() - this._start;
        this.#accumulator += delta;
    }

    /** Finalizes the measurement for this frame */
    endFrame() {
        this._buffer[this._pointer] = this.#accumulator;
        this._pointer = (this._pointer + 1) % this._buffer.length;
        if (this.#accumulator > this._peak) this._peak = this.#accumulator;
        this.#accumulator = 0;
    }
}