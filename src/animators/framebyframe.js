/**
 *  FrameAnimation represents timings for a single animation frame
 * @typedef FrameAnimation
 * @prop {number} start
 * @prop {number} duration
 * @prop {number} frame
 * /**
 * @typedef {FrameAnimation[]} Animation
 */

/**
 * A Frame-by-frame animator that can run specified frame-by-frame animations
 * Tip: Use in combination with Bounds to create an animated sprite
 */
export class FrameByFrameAnimator {
  /** @type {import('../image.js').Image[]} */
  #frames = []
  /** @type {Map<string, Animation>} */
  #animations = new Map()
  /** @type {Animation | undefined} */
  #active
  /** @type {number} */
  #frame = 0
  /** @type {number} */
  #elapsed = 0
  /** @type {boolean} */
  #loop = false

  /**
   * @param {import('../image.js').Image[]} frames
   */
  constructor(frames) {
    this.#frames = frames
  }

  /**
   * addAnimation Adds a new named animation to the Animator
   * @param {string} name
   * @param {Animation} animation
   */
  addAnimation(name, animation) {
    this.#animations.set(name, animation)
  }
  /**
   * clearAnimation Clears the currently active animation
   * and returns the image to the default image
   */
  clear() {
    this.#active = void 0
    this.#loop = false
    this.#elapsed = 0
  }
  /**
   * startAnimation Starts an animation by it's name
   * @param {string} name
   * @param {boolean} loop
   */
  startAnimation(name, loop) {
    this.#active = this.#animations.get(name)
    this.#loop = loop
    this.#elapsed = 0
  }
  /**
   * image Returns the current active image for the animation
   * @returns {import('../image.js').Image}
   */
  image() {
    return this.#frames[this.#frame]
  }
  /**
   * update Call this on every frame to "run" the animation
   * @param {number} delta
   */
  update(delta) {
    if (!this.#active) return
    const last = this.#active[this.#active.length - 1]
    const total = last.start + last.duration
    this.#elapsed += delta
    if (this.#elapsed >= total && !this.#loop) {
      this.clear()
    }
    this.#elapsed %= total
    for (const frame of this.#active) {
      if (this.#elapsed > frame.start) {
        this.#frame = frame.frame
      }
    }
  }
}
