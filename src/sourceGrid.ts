import { SpriteGrid } from './grid.js'
import { Sheet } from './loaders/index.js'
import { SourceSprite } from './sprite.js'
import type { Sprite, SpriteSource } from './types/index.js'

/** Represents a grid of sprite sources */
export class SpriteSourceGrid extends SpriteGrid {
  #sources: SpriteSource[]

  static fromTileSheet(sheet: Sheet): SpriteSourceGrid {
    const grid = new SpriteSourceGrid(sheet.width, sheet.height, sheet.cellWidth, sheet.cellHeight)
    for (const [i, source] of sheet.sources().entries()) {
      grid.setContent(i, source)
    }
    return grid
  }

  constructor(gridWidth: number, gridHeight: number, cellWidth: number, cellHeight: number) {
    super(gridWidth, gridHeight, cellWidth, cellHeight)
    this.#sources = Array(this.len())
  }
  /** Gets all sources in the grid */
  sources(): SpriteSource[] {
    return this.#sources
  }
  /** Get source at index location */
  getSource(index: number): SpriteSource {
    return this.#sources[index]
  }
  /** Get source at position */
  getSourceAt(x: number, y: number): SpriteSource {
    return this.#sources[this.indexAt(x, y)]
  }
  /** Sets content at index */
  // @ts-expect-error
  setContent(index: number, source: SpriteSource) {
    this.#sources[index] = source
    if (source) {
      super.setContent(index, new SourceSprite(source))
    } else {
      super.setContent(index, void 0)
    }
  }
  /** Sets all content for the grid */
  // @ts-expect-error Allow overwriting of property with different signature
  setAllContent(sources: SpriteSource[]) {
    this.#sources = sources
    /** @type {(import('./types/index.js').Sprite|undefined)[]} */
    const sprites: (Sprite | undefined)[] = []
    for (const source of sources) {
      if (source) {
        sprites.push(new SourceSprite(source))
      } else {
        sprites.push(void 0)
      }
    }
    super.setAllContent(sprites)
  }
  /** Sets content at position */
  // @ts-expect-error Allow overwriting of property with different signature
  setContentAt(x: number, y: number, source: SpriteSource) {
    this.setContent(this.indexAt(x, y), source)
  }
}
