import { Box } from '../bounds/box.js'
import { BasicCamera } from './camera-basic.js'

/**
 * Represents a Background that can be used to create a parallax effect
 * Note: This is also a RenderLayer that can be used with the Renderer
 */
export class ParallaxBackground extends Box {
  /** @type {BasicCamera} */
  #camera
  /** @type {number} */
  #order
  /** @type {number} */
  #worldWidth
  /** @type {number} */
  #worldHeight
  /** @type {import('../image.js').Image} */
  #image
  /**
   *
   * @param {number} order
   * @param {number} viewWidth
   * @param {number} viewHeight
   * @param {number} worldWidth
   * @param {number} worldHeight
   * @param {import('../image.js').Image} image
   */
  constructor(order, viewWidth, viewHeight, worldWidth, worldHeight, image) {
    super(image.width, image.height)
    this.#order = order
    this.#worldWidth = worldWidth
    this.#worldHeight = worldHeight
    this.#image = image
    this.#camera = new BasicCamera(
      viewWidth,
      viewHeight,
      image.width,
      image.height,
    )
  }
  /**
   * RenderLayer ordering
   * @returns {number}
   */
  order() {
    return this.#order
  }
  /**
   * Update the background
   * @param {number} x
   * @param {number} y
   */
  update(x, y) {
    const xp = x / this.#worldWidth
    const yp = y / this.#worldHeight
    x = Math.floor(this.dx() * xp)
    y = Math.floor(this.dy() * yp)
    this.#camera.setPos(x, y)
  }
  /**
   * Draw the background to the provided context
   * @param {import('../image.js').Context} screen
   */
  draw(screen) {
    screen.drawImage(
      this.#image,
      ...this.#camera.view(),
      0,
      0,
      ...this.#camera.viewSize(),
    )
  }
}
