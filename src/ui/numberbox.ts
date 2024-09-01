import { RawBounds } from '../bounds/index.js'
import { Key, isKeyPressed, typedThisFrame, MouseButton, isMouseButtonJustPressed, isInputCaptured, inputCapture } from '../input/index.js'
import { isWithin } from '../utils/index.js'

export class NumberBox extends RawBounds {
  #content: number = 0
  #cooldown: number = 0
  #repeating: boolean = false
  #focused: boolean = false

  constructor(w: number, h: number) {
    super(w, h)
  }
  /** Gets the content of the NumberBox */
  content(): number {
    return this.#content
  }
  /** Sets the content of the NumberBox */
  setContent(content: number) {
    this.#content = content
  }
  /** Updates the NumberBox, requires the cursor position */
  update(x: number, y: number, delta: number) {
    if (isInputCaptured()) {
      this.#focused = false
      return
    }
    if (this.#focused) {
      inputCapture()
      // Detect click outside of box to lose focus
      if (
        !isWithin(this, x, y) &&
        isMouseButtonJustPressed(MouseButton.Left)
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
        isMouseButtonJustPressed(MouseButton.Left)
      ) {
        inputCapture()
        this.#focused = true
      }
    }
  }
}
