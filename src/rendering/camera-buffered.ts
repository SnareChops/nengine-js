import { createCanvas } from '../types/index.js'
import { BasicCamera } from './camera-basic.js'
import type { Image, Context } from '../types/index.js'

export class BufferedCamera extends BasicCamera {
  #context: Context

  constructor(viewWidth: number, viewHeight: number, worldWidth: number, worldHeight: number) {
    super(viewWidth, viewHeight, worldWidth, worldHeight)
    this.#context = createCanvas(viewWidth, viewHeight)
  }

  image(source: Image): Image {
    this.#context.reset()
    this.#context.drawImage(source, ...this.view(), 0, 0, ...this.size())
    return this.#context.canvas
  }
}
