import { DebugTimer } from './timer.js'

/** @type {FrameTimer[]} */
export const frameTimers = []

/** Debug utility to measure time spent */
export class FrameTimer extends DebugTimer {
  /** @type {number} */
  #accumulator = 0
  /**
   * @param {string} name
   * @param {boolean} auto
   */
  constructor(name, auto) {
    super(name)
    if (auto) frameTimers.push(this)
  }
  /** Ends the current measurement segment */
  end() {
    const delta = Date.now() - this._start
    this.#accumulator += delta
  }
  /** Finalizes the measurement for this frame */
  endFrame() {
    this._buffer[this._pointer] = this.#accumulator
    this._pointer = (this._pointer + 1) % this._buffer.length
    if (this.#accumulator > this._peak) this._peak = this.#accumulator
    this.#accumulator = 0
  }
}
