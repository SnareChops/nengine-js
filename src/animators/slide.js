import { clamp } from '../utils/index.js'

export class SlideAnimator {
  /** @type {number} */
  #slider = 0
  /** @type {number} */
  #duration = 0
  /** @type {number} */
  #frame = 0
  /** @type {import('../image.js').Image[]} */
  #frames
  /**
   * @param {number} duration
   * @param {import('../image.js').Image[]} frames
   */
  constructor(duration, frames) {
    this.#frames = frames
    this.#duration = duration
  }
  /**
   * @param {boolean} advance
   * @param {number} delta
   * @returns {boolean}
   */
  update(advance, delta) {
    const prev = this.#frame
    if (advance) {
      this.#frame += delta
    } else {
      this.#frame -= delta
    }
    this.#slider = clamp(this.#slider, 0, this.#duration)
    this.#frame = Math.floor(
      (this.#slider / this.#duration) * (this.#frames.length - 1),
    )
    return prev != this.#frame
  }
  /**
   * @returns {import('../image.js').Image}
   */
  image() {
    return this.#frames[this.#frame]
  }
}
