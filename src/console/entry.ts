import { RawBounds } from '../bounds/index.js'
import { Text, drawText } from '../fonts/index.js'
import { Context, Image, createCanvas } from '../types/index.js'
import type { Color } from '../color.js'
import { isKeyPressed, isKeyJustPressed, Key, typedThisFrame } from '../input/index.js'

export class Entry extends RawBounds {
  #value: string = ''
  #cooldown: number = 0
  #repeating: boolean = false
  #text: Text
  #cursor: Context
  #image: Context

  constructor(w: number, h: number, color: Color) {
    super(w, h)
    this.#text = new Text(this.#value, 0, 'monospace', color)
    this.#cursor = createCanvas(3, 20)
    this.#cursor.fillStyle = color.hex()
    this.#cursor.fill()
    this.#image = createCanvas(...this.size())
    this.render()
    return this
  }

  update(delta: number): [boolean, string] {
    const prev = this.#value
    if (isKeyPressed(Key.Backspace)) {
      this.#cooldown -= delta
      if (this.#cooldown <= 0 && this.#value.length > 0) {
        this.#value = this.#value.slice(0, this.#value.length - 1)
        if (this.#repeating) {
          this.#cooldown = 100
        } else {
          this.#cooldown = 500
          this.#repeating = true
        }
      }
      if (prev != this.#value) {
        this.#text.setValue(this.#value)
        this.render()
        return [true, ""]
      }
      return [false, ""]
    } else {
      this.#cooldown = 0
      this.#repeating = false
    }
    // If enter key is pressed
    if (isKeyJustPressed(Key.Enter)) {
      const value = this.#value
      this.#value = ""
      this.#text.setValue(this.#value)
      this.render()
      return [true, value.trim()]
    }
    // Handle keypresses
    this.#value += typedThisFrame()
    if (prev !== this.#value) {
      this.#text.setValue(this.#value)
      this.render()
      return [true, ""]
    }
    return [false, ""]
  }

  render() {
    this.#image.reset()
    drawText(this.#image, this.#text)
    // rendering.DrawAt(self.image, self.cursor, 0, 0)
  }

  image(): Image {
    return this.#image.canvas
  }
}
