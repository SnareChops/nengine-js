import { getSheetCell } from './image.js'

export class SheetSource {
  /** @type {string} */
  #alias = ''
  /** @type {number} */
  #index = 0
  /**
   * @param {string} alias
   * @param {number} index
   */
  constructor(alias, index) {
    this.#alias = alias
    this.#index = index
  }
  /**
   * @returns {string}
   */
  alias() {
    return this.#alias
  }
  /**
   * @returns {number}
   */
  index() {
    return this.#index
  }
  /**
   * @returns {import('../image.js').Image}
   */
  image() {
    return getSheetCell(this.#alias, this.#index)
  }
}

export class Sheet {
  /** @type {string} */
  alias = ''
  /** @type {number} */
  width = 0
  /** @type {number} */
  height = 0
  /** @type {number} */
  cellWidth = 0
  /** @type {number} */
  cellHeight = 0
  /** @type {import('../image.js').Image[]} */
  cells = []
  /**
   *
   * @param {string} alias
   * @param {number} width
   * @param {number} height
   * @param {number} cellWidth
   * @param {number} cellHeight
   * @param {import('../image.js').Image[]} cells
   */
  constructor(alias, width, height, cellWidth, cellHeight, cells = []) {
    this.alias = alias
    this.width = width
    this.height = height
    this.cellWidth = cellWidth
    this.cellHeight = cellHeight
    this.cells = cells
  }
  /**
   * @returns {SheetSource[]}
   */
  sources() {
    /** @type {SheetSource[]} */
    const sources = []
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
