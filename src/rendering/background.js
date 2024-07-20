import { Box } from '../bounds/index.js'

/**
 * @typedef backgroundPiece
 * @prop {import('../image.js').Image} image
 * @prop {number} x
 * @prop {number} y
 */
/**
 * Background represents an assortment of images to use a
 * background
 * Consider using ChunkImage() or ChunkBounds() if needed to
 * split a large image into smaller pieces
 * Note: This is also a RenderLayer that can be used with the Renderer
 */
export class Background extends Box {
  /** @type {backgroundPiece[]} */
  #pieces = []
  /** @type {import('../types/index.js').Camera} */
  #camera
  /** @type {number} */
  #order
  /**
   *
   * @param {number} order
   * @param {number} w
   * @param {number} h
   * @param {import('../types/index.js').Camera} camera
   */
  constructor(order, w, h, camera) {
    super(w, h)
    this.#order = order
    this.#camera = camera
  }
  /**
   * Background rendering order
   * @returns {number}
   */
  order() {
    return this.#order
  }
  /** Clear the background */
  clearBackground() {
    this.#pieces = []
  }
  /**
   * Add an image to the Background at the provided offset using world coordinates
   * @param {import('../image.js').Image} image
   * @param {number} offsetX
   * @param {number} offsetY
   */
  addBackgroundImage(image, offsetX, offsetY) {
    this.#pieces.push({ image, x: offsetX, y: offsetY })
  }
  /**
   * Draw the Background to the screen
   * @param {import('../image.js').Context} screen
   */
  draw(screen) {
    for (const piece of this.#pieces) {
      if (piece.image) {
        const [x, y] = this.#camera.worldToScreenPos(piece.x, piece.y)
        screen.drawImage(piece.image, x, y)
      }
    }
  }
}
