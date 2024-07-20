import { RawBounds } from '../bounds/index.js'
import { Input } from '../input.js'
import { Key, isKeyPressed, typedThisFrame } from '../keyboard.js'
import { MouseButton, isMouseButtonJustPressed } from '../mouse.js'
import { isWithin } from '../utils/index.js'

export class NumberBox extends RawBounds {
  /** @type {Input} */
  #input
  /** @type {number} */
  #content = 0
  /** @type {number} */
  #cooldown = 0
  /** @type {boolean} */
  #repeating = false
  /** @type {boolean} */
  #focused = false
  /**
   * @param {number} w
   * @param {number} h
   * @param {Input} input
   */
  constructor(w, h, input) {
    super(w, h)
    this.#input = input
  }
  /**
   * Gets the content of the NumberBox
   * @returns {number}
   */
  content() {
    return this.#content
  }
  /**
   * Sets the content of the NumberBox
   * @param {number} content
   */
  setContent(content) {
    this.#content = content
  }
  /**
   * Updates the NumberBox, requires the cursor position
   * @param {number} x
   * @param {number} y
   * @param {number} delta
   */
  update(x, y, delta) {
    if (this.#input.isCaptured()) {
      this.#focused = false
      return
    }
    if (this.#focused) {
      this.#input.capture()
      // Detect click outside of box to lose focus
      if (
        !isWithin(this, x, y) &&
        isMouseButtonJustPressed(MouseButton.MouseLeft)
      ) {
        this.#focused = false
        return
      }
      // Handle backspace
      this.#cooldown -= delta
      if (isKeyPressed(Key.Backspace)) {
        if (this.#cooldown <= 0) {
          this.#content /= 10
          if (this.#repeating) {
            this.#cooldown = 100
          } else {
            this.#cooldown = 500
          }
          this.#repeating = true
        }
        return
      } else {
        this.#cooldown = 0
        this.#repeating = false
      }
      // Handle keypresses
      const typed = typedThisFrame()
      for (const char of typed.split('')) {
        const value = Number(char)
        if (isNaN(value)) continue
        this.#content = this.#content * 10 + value
      }
    } else {
      // Detect click on box to set focus
      if (
        isWithin(this, x, y) &&
        isMouseButtonJustPressed(MouseButton.MouseLeft)
      ) {
        this.#input.capture()
        this.#focused = true
      }
    }
  }
}
