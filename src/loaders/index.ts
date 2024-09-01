import { getSheetCell } from './image.js'
import type { Image } from '../types/index.js'

export class SheetSource {
  #alias: string = ''
  #index: number = 0

  constructor(alias: string, index: number) {
    this.#alias = alias
    this.#index = index
  }

  alias(): string {
    return this.#alias
  }

  index(): number {
    return this.#index
  }

  image(): Image {
    return getSheetCell(this.#alias, this.#index)
  }
}

export class Sheet {
  alias: string = ''
  width: number = 0
  height: number = 0
  cellWidth: number = 0
  cellHeight: number = 0
  cells: Image[] = []

  constructor(alias: string, width: number, height: number, cellWidth: number, cellHeight: number, cells: Image[] = []) {
    this.alias = alias
    this.width = width
    this.height = height
    this.cellWidth = cellWidth
    this.cellHeight = cellHeight
    this.cells = cells
  }

  sources(): SheetSource[] {
    const sources: SheetSource[] = []
    for (let i = 0; i < this.cells.length; i++) {
      sources.push(new SheetSource(this.alias, i))
    }
    return sources
  }
}

export {
  preloadImage,
  preloadSheet,
  preloadAnim,
  getImage,
  getSheet,
  getSheetCell,
  getSheetRange,
  getAnim,
} from './image.js'
export { preloadImageRaw, preloadSheetRaw, preloadSheetManual } from './raw.js'
