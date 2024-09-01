import { Box } from '../bounds/box.js'
import { debugStat } from '../debug/index.js'
import { cursorPosition } from '../input/index.js'
import type { Sprite, Context } from '../types/index.js'

/** A RenderLayer for drawing sprites using screen coordinates */
export class Screen extends Box {
  #order: number = 0
  #sprites: Sprite[] = []

  constructor(order: number, w: number, h: number) {
    super(w, h)
    this.#order = order
    debugStat('Screen', () => {
      const [x, y] = cursorPosition()
      return `${x}, ${y}`
    })
  }
  /** Screen rendering order */
  order(): number {
    return this.#order
  }
  /** Get all sprites in the Screen */
  sprites(): Sprite[] {
    return this.#sprites
  }
  /** Adds a sprite to the Screen */
  addSprite(sprite: Sprite) {
    if (this.#sprites.includes(sprite)) return
    this.#sprites.push(sprite)
  }
  /** Remove a sprite from the Screen */
  removeSprite(sprite: Sprite) {
    if (!this.#sprites.includes(sprite)) return
    this.#sprites.splice(this.#sprites.indexOf(sprite), 1)
  }
  /** Draws the Screen RenderLayer */
  draw(ctx: Context) {
    this.#sprites.sort((a, b) => a.z() - b.z())
    for (const sprite of this.#sprites) {
      const image = sprite.image()
      if (!!image) {
        ctx.drawImage(image, ...sprite.min())
      }
    }
  }
}
