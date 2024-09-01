import { RawBounds } from '../bounds/index.js'
import { Key, isKeyPressed, typedThisFrame, MouseButton, isMouseButtonJustPressed, isInputCaptured, inputCapture } from '../input/index.js'
import { isWithin } from '../utils/index.js'

export class TextBox extends RawBounds {
  #content: string = ''
  #cooldown: number = 0
  #repeating: boolean = false
  #focused: boolean = false

  constructor(w: number, h: number) {
    super(w, h)
  }
  /** Get content of the box */
  content(): string {
    return this.#content
  }
  /** Sets content of the box */
  setContent(content: string) {
    this.#content = content
  }
  /** Focus the textbox */
  focus() {
    this.#focused = true
  }
  /** Updates the box, requires cursor position */
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
          this.#content = this.#content.slice(0, this.#content.length - 1)
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
      // Handle typed characters
      this.#content += typedThisFrame()
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
