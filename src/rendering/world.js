import { Box } from '../bounds/index.js'
import { debugStat } from '../debug/index.js'

/** A RenderLayer for drawing sprites using world coordinates */
export class World extends Box {
  /** @type {import('../types/index.js').Camera} */
  #camera
  /** @type {number} */
  #order = 0
  /** @type {import('../types/index.js').Sprite[]} */
  #sprites = []
  /**
   * @param {number} order
   * @param {import('../types/index.js').Camera} camera
   */
  constructor(order, camera) {
    super(...camera.worldSize())
    this.#order = order
    this.#camera = camera
    debugStat('World', () => {
      const [x, y] = this.#camera.cursorWorldPosition()
      return `${x}, ${y}`
    })
  }
  /**
   * World rendering order
   * @returns {number}
   */
  order() {
    return this.#order
  }
  /**
   * Get all sprites in the World
   * @returns {import('../types/index.js').Sprite[]}
   */
  sprites() {
    return this.#sprites
  }
  /**
   * Add a sprite to the World
   * @param {import('../types/index.js').Sprite} sprite
   */
  addSprite(sprite) {
    if (this.#sprites.includes(sprite)) return
    this.#sprites.push(sprite)
  }
  /**
   * Remove sprite from the World
   * @param {import('../types/index.js').Sprite} sprite
   */
  removeSprite(sprite) {
    if (!this.#sprites.includes(sprite)) return
    this.#sprites.splice(this.#sprites.indexOf(sprite), 1)
  }
  /**
   * Draws the World
   * @param {import('../image.js').Context} ctx
   */
  draw(ctx) {
    this.#sprites.sort((a, b) => a.y() - b.y())
    for (const sprite of this.#sprites) {
      const image = sprite.image()
      if (!!image) {
        ctx.drawImage(image, ...sprite.min())
      }
    }
  }
}
