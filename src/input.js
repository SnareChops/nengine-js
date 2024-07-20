import { cursorPosition } from './mouse.js'

export class Input {
  /** @type {boolean} */
  #captured = false
  /** @type {number} */
  #cursorDeltaX = 0
  /** @type {number} */
  #cursorDeltaY = 0
  /** @type {number} */
  #cursorPrevX = 0
  /** @type {number} */
  #cursorPrevY = 0
  /** @type {import('./types/index.js').Sprite|undefined} */
  #cursorContent
  /** @type {number} */
  #order = 0

  /**
   * Sets the Input rendering order
   * @param {number} order
   */
  setOrder(order) {
    this.#order = order
  }
  /**
   * Input rendering order
   * @returns {number}
   */
  order() {
    return this.#order
  }
  /**
   * "Capture" the input.
   * This is useful for preventing multiple different parts
   * of your code from all handling input events when your
   * intention is to only handle it in one place.
   * For example: Multiple sprites are layered on top of eachother.
   * You might want to only handle the click by the sprite that is
   * on top of the others. The top sprite can "capture" the event
   * then the other sprites can check if the input has already been
   * captured and ignore the click event.
   * Note: The `update()` function must be called before any code that
   * may use this feature, for example at the beginning of your scene's
   * `update()` function.
   */
  capture() {
    this.#captured = true
  }
  /**
   * Checks if the input has already been captured
   * @returns {boolean}
   */
  isCaptured() {
    return this.#captured
  }
  /**
   * Gets the cursor content
   * @returns {import('./types/index.js').Sprite|undefined}
   */
  cursorContent() {
    return this.#cursorContent
  }
  /**
   * Sets the cursor content
   * set to undefined to remove the cursor content
   * @param {import('./types/index.js').Sprite|undefined} content
   */
  setCursorContent(content) {
    this.#cursorContent = content
  }
  /**
   * Returns the difference in cursor position from the previous
   * frame.
   * Note: `update()` must be called for this to function correctly
   * @returns {[x: number, y: number]}
   */
  cursorDelta() {
    return [this.#cursorDeltaX, this.#cursorDeltaY]
  }
  /** Update the input state */
  update() {
    this.#captured = false
    const [x, y] = cursorPosition()
    this.#cursorDeltaX = x - this.#cursorPrevX
    this.#cursorDeltaY = y - this.#cursorPrevY
    this.#cursorPrevX = x
    this.#cursorPrevY = y
    if (!!this.#cursorContent) {
      this.#cursorContent.setPos2(x, y)
    }
  }
  /**
   * Draws the cursor content
   * @param {import('./image.js').Context} ctx
   */
  draw(ctx) {
    if (this.#cursorContent) {
      const image = this.#cursorContent.image()
      if (image) {
        ctx.drawImage(image, ...this.#cursorContent.min())
      }
    }
  }
}
