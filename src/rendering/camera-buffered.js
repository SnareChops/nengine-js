import { createCanvas } from '../image.js'
import { BasicCamera } from './camera-basic.js'

export class BufferedCamera extends BasicCamera {
  /** @type {import('../image.js').Image} */
  #image
  /** @type {import('../image.js').Context} */
  #context
  /**
   * @param {number} viewWidth
   * @param {number} viewHeight
   * @param {number} worldWidth
   * @param {number} worldHeight
   */
  constructor(viewWidth, viewHeight, worldWidth, worldHeight) {
    super(viewWidth, viewHeight, worldWidth, worldHeight)
    ;[this.#image, this.#context] = createCanvas(viewWidth, viewHeight)
  }
  /**
   * @param {import('../image.js').Image} source
   * @returns {import('../image.js').Image}
   */
  image(source) {
    this.#context.reset()
    this.#context.drawImage(source, ...this.view(), 0, 0, ...this.size())
    return this.#image
  }
}
