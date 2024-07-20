/**
 * @typedef SimpleFrame
 * @prop {number} duration
 * @prop {import('../image.js').Image} image
 */

export class SimpleAnimator {
  /** @type {SimpleFrame[]} */
  #frames = []
  /** @type {boolean} */
  #loop = false
  /** @type {boolean} */
  #active = false
  /** @type {number} */
  #cooldown = 0
  /** @type {number} */
  #index = 0
  /**
   * @param {SimpleFrame[]} frames
   */
  constructor(frames) {
    this.#frames = frames
  }
  /**
   * @param {boolean} loop
   */
  start(loop) {
    this.#loop = loop
    this.#cooldown = this.#frames[0].duration
    this.#active = true
  }
  /** @returns {boolean} */
  isActive() {
    return this.#active
  }
  /** @returns {number} */
  index() {
    return this.#index
  }
  /**
   * @param {number} delta
   */
  update(delta) {
    if (!this.#active) return
    while (delta > 0) {
      delta = this.#update(delta)
    }
  }
  /**
   * @param {number} delta
   * @returns {number}
   */
  #update(delta) {
    this.#cooldown -= delta
    if (this.#cooldown <= 0) {
      const rem = this.#cooldown * -1
      this.#next()
      if (rem > 0) return rem
    }
    return 0
  }

  #next() {
    this.#index++
    if (this.#index >= this.#frames.length) {
      this.#index = 0
      if (!this.#loop) {
        this.#active = false
        return
      }
    }
    this.#cooldown = this.#frames[this.#index].duration
  }
  /** @returns {import('../image.js').Image} */
  image() {
    return this.#frames[this.#index].image
  }
}
