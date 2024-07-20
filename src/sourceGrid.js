import { SpriteGrid } from './grid.js'
import { SourceSprite } from './sprite.js'

/** Represents a grid of sprite sources */
export class SpriteSourceGrid extends SpriteGrid {
  /** @type {import('./types/index.js').SpriteSource[]} */
  #sources
  /**
   * @param {number} gridWidth
   * @param {number} gridHeight
   * @param {number} cellWidth
   * @param {number} cellHeight
   */
  constructor(gridWidth, gridHeight, cellWidth, cellHeight) {
    super(gridWidth, gridHeight, cellWidth, cellHeight)
    this.#sources = Array(this.len())
  }
  /**
   * Gets all sources in the grid
   * @returns {import('./types/index.js').SpriteSource[]}
   */
  sources() {
    return this.#sources
  }
  /**
   * Get source at index location
   * @param {number} index
   * @returns {import('./types/index.js').SpriteSource}
   */
  getSource(index) {
    return this.#sources[index]
  }
  /**
   * Get source at position
   * @param {number} x
   * @param {number} y
   * @returns {import('./types/index.js').SpriteSource}
   */
  getSourceAt(x, y) {
    return this.#sources[this.indexAt(x, y)]
  }
  /**
   * Sets content at index
   * @param {number} index
   * @param {import('./types/index.js').SpriteSource} source
   */
  // @ts-expect-error
  setContent(index, source) {
    this.#sources[index] = source
    if (source) {
      super.setContent(index, new SourceSprite(source))
    } else {
      super.setContent(index, void 0)
    }
  }
  /**
   * Sets all content for the grid
   * @param {import('./types/index.js').SpriteSource[]} sources
   */
  // @ts-expect-error Allow overwriting of property with different signature
  setAllContent(sources) {
    this.#sources = sources
    /** @type {(import('./types/index.js').Sprite|undefined)[]} */
    const sprites = []
    for (const source of sources) {
      if (source) {
        sprites.push(new SourceSprite(source))
      } else {
        sprites.push(void 0)
      }
    }
    super.setAllContent(sprites)
  }
  /**
   * Sets content at position
   * @param {number} x
   * @param {number} y
   * @param {import('./types/index.js').SpriteSource} source
   */
  // @ts-expect-error Allow overwriting of property with different signature
  setContentAt(x, y, source) {
    this.setContent(this.indexAt(x, y), source)
  }
}
