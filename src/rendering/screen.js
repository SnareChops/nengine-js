import { Box } from '../bounds/index.js'
import { debugStat } from '../debug/index.js'
import { cursorPosition } from '../mouse.js'

/** A RenderLayer for drawing sprites using screen coordinates */
export class Screen extends Box {
  /** @type {number} */
  #order = 0
  /** @type {import('../types/index.js').Sprite[]} */
  #sprites = []
  /**
   * @param {number} order
   * @param {number} w
   * @param {number} h
   */
  constructor(order, w, h) {
    super(w, h)
    this.#order = order
    debugStat('Screen', () => {
      const [x, y] = cursorPosition()
      return `${x}, ${y}`
    })
  }
  /**
   * Screen rendering order
   * @returns {number}
   */
  order() {
    return this.#order
  }
  /**
   * Get all sprites in the Screen
   * @returns {import('../types/index.js').Sprite[]}
   */
  sprites() {
    return this.#sprites
  }
  /**
   * Adds a sprite to the Screen
   * @param {import('../types/index.js').Sprite} sprite
   */
  addSprite(sprite) {
    if (this.#sprites.includes(sprite)) return
    this.#sprites.push(sprite)
  }
  /**
   * Remove a sprite from the Screen
   * @param {import('../types/index.js').Sprite} sprite
   */
  removeSprite(sprite) {
    if (!this.#sprites.includes(sprite)) return
    this.#sprites.splice(this.#sprites.indexOf(sprite), 1)
  }
  /**
   * Draws the Screen RenderLayer
   * @param {import('../image.js').Context} ctx
   */
  draw(ctx) {
    this.#sprites.sort((a, b) => a.z() - b.z())
    for (const sprite of this.#sprites) {
      const image = sprite.image()
      if (!!image) {
        ctx.drawImage(image, ...sprite.min())
      }
    }
  }
}
