import { LEFT, RawBounds, TOP } from './bounds/index.js'
import { Color } from './color.js'
import { Line, drawLine } from './line.js'
import { SimpleSprite } from './sprite.js'
import { createCanvas } from './image.js'

/** Represents a grid of sprites */
export class SpriteGrid extends RawBounds {
  /** @type {number} */
  #cw = 0
  /** @type {number} */
  #ch = 0
  /** @type {(import('./types/index.js').Sprite|undefined)[]} */
  #contents
  /** @type {Line[]} */
  #lines = []
  /** @type {Color|undefined} */
  #lineColor
  /** @type {number} */
  #lineWidth = 0
  /** @type {import('./image.js').Image} */
  #image
  /** @type {import('./image.js').Context} */
  #context
  /** @type {number} */
  #selected = -1
  /** @type {number} */
  #selectedWidth = 0
  /** @type {Color|undefined} */
  #selectedColor

  /**
   * IMPORTANT: The final size of the grid will always be a multiple of the cell sizes
   * Provided gridWidth and gridHeight will be used as a maximum and the actual width
   * will be calculated and set as the bounds size. Use `.size()` after constructing
   * to get the actual size of the grid.
   * @param {number} gridWidth
   * @param {number} gridHeight
   * @param {number} cellWidth
   * @param {number} cellHeight
   */
  constructor(gridWidth, gridHeight, cellWidth, cellHeight) {
    super(
      Math.floor(gridWidth / cellWidth) * cellWidth,
      Math.floor(gridHeight / cellHeight) * cellHeight,
    )
    this.#cw = cellWidth
    this.#ch = cellHeight
    this.#contents = Array((this.dx() / cellWidth) * (this.dy() / cellHeight))
    for (let x = 0; x < this.dx(); x += cellWidth) {
      this.#lines.push(new Line(x, 0, x, this.dy()))
    }
    for (let y = 0; y < this.dy(); y += cellHeight) {
      this.#lines.push(new Line(0, y, this.dx(), y))
    }
    ;[this.#image, this.#context] = createCanvas(...this.size())
  }
  /**
   * Gets the length of the grid contents
   * @returns {number}
   */
  len() {
    return this.contents.length
  }
  /**
   * Resizes the grid to fit the specified size
   * Note: Aspect ratio is maintained, so the final size
   * may be different than the size you requested.
   * @param {number} w
   * @param {number} h
   */
  resize(w, h) {
    const wf = w / this.dx()
    const hf = h / this.dy()
    const scale = Math.min(wf, hf)
    this.#cw = Math.floor(this.#cw * scale)
    this.#ch = Math.floor(this.#ch * scale)
    super.resize(w, h)
    for (const content of this.#contents) {
      if (content) content.resize(this.#cw, this.#ch)
    }
    ;[this.#image, this.#context] = createCanvas(...this.size())
    this.#render()
  }
  /**
   * Gets the cell size of the grid
   * @returns {[w: number, h: number]}
   */
  cellSize() {
    return [this.#cw, this.#ch]
  }
  /**
   * Gets the full list of sprites in the grid
   * @returns {(import('./types/index.js').Sprite|undefined)[]}
   */
  contents() {
    return this.#contents
  }
  /**
   * Gets the sprite at the provided index in the grid (left-to-right top-to-bottom)
   * @param {number} index
   * @returns {import('./types/index.js').Sprite|undefined}
   */
  getContent(index) {
    if (index >= this.#contents.length) return void 0
    return this.#contents[index]
  }
  /**
   * Sets the sprite at the provided index in the grid (left-to-right top-to-bottom)
   * To remove a sprite from the grid, set to undefined
   * @param {number} index
   * @param {import('./types/index.js').Sprite|undefined} content
   */
  setContent(index, content) {
    if (index >= this.#contents.length) return
    this.#contents[index] = content
    if (!!content) {
      const [x, y] = this.indexPos(index)
      content.setAnchor(LEFT, TOP)
      content.setPos2(x, y)
      content.resize(this.#cw, this.#ch)
    }
    this.#render()
  }
  /**
   * Sets all content for the grid
   * @param {(import('./types/index.js').Sprite|undefined)[]} contents
   */
  setAllContent(contents) {
    if (contents.length !== this.#contents.length) {
      console.error(
        'Attempted to set grid content with array of different size than the grid expected',
      )
      return
    }
    this.#contents = contents
    for (const [i, content] of this.#contents.entries()) {
      if (content) {
        const [x, y] = this.indexPos(i)
        content.setAnchor(LEFT, TOP)
        content.setPos2(x, y)
        content.resize(this.#cw, this.#ch)
      }
    }
    this.#render()
  }
  /**
   * Sets the image as a sprite to the provided index in the grid
   * @param {number} index
   * @param {import('./image.js').Image} image
   */
  setRawContent(index, image) {
    this.setContent(index, new SimpleSprite(image))
  }
  /**
   * Get the index that maps to the provided x,y coordinate
   * @param {number} x
   * @param {number} y
   * @returns {number}
   */
  indexAt(x, y) {
    return (
      Math.floor(y / this.#ch) * Math.floor(this.dx() / this.#cw) +
      Math.floor(x / this.#cw)
    )
  }
  /**
   * Gets the x, y coordinate of the top left corner of the grid cell
   * at the specified index
   * @param {number} index
   * @returns {[x: number, y: number]}
   */
  indexPos(index) {
    const x = Math.floor((index * this.#cw) % this.dx())
    const y = Math.floor((index * this.#cw) / this.dx())
    return [x, y]
  }
  /**
   * Get the sprite at the given x,y coordinate
   * @param {number} x
   * @param {number} y
   * @returns {import('./types/index.js').Sprite|undefined}
   */
  getContentAt(x, y) {
    return this.getContent(this.indexAt(x, y))
  }
  /**
   * Set the sprite at the given x,y coordinate
   * To remove a sprite from the grid, set to undefined
   * @param {number} x
   * @param {number} y
   * @param {import('./types/index.js').Sprite|undefined} content
   */
  setContentAt(x, y, content) {
    this.#contents[this.indexAt(x, y)] = content
    if (!!content) {
      content.xy(x, y)
    }
    this.#render()
  }
  /**
   * Sets the image as a sprite to the provided position in the grid
   * @param {number} x
   * @param {number} y
   * @param {import('./image.js').Image} image
   */
  setRawContentAt(x, y, image) {
    this.setContent(this.indexAt(x, y), new SimpleSprite(image))
  }
  /**
   * Visually higlights the cell at the specified index
   * @param {number} index
   * @param {number} width
   * @param {Color} color
   */
  select(index, width, color) {
    this.#selected = index
    this.#selectedWidth = width
    this.#selectedColor = color
    this.#render()
  }
  /**
   * Visually highlights the cell at the specified position
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {Color} color
   */
  selectAt(x, y, width, color) {
    this.select(this.indexAt(x, y), width, color)
  }
  /**
   * Reloads the sprites in the grid (if they are reloadable)
   */
  reload() {
    for (const sprite of this.#contents) {
      // @ts-expect-error
      if (typeof sprite.reload === 'function') {
        // @ts-expect-error
        sprite.reload()
      }
    }
    this.#render()
  }
  /**
   * Return the gridlines
   * @returns {Line[]}
   */
  lines() {
    return this.#lines
  }
  /**
   * Show the gridlines using the provided stroke width and color
   * @param {number} width
   * @param {Color} color
   */
  showLines(width, color) {
    this.#lineColor = color
    this.#lineWidth = width
    this.#render()
  }
  /** Hide the gridlines */
  hideLines() {
    this.#lineColor = void 0
    this.#render()
  }
  /**
   * Toggles the gridlines
   * @param {number} width
   * @param {Color} color
   */
  toggleLines(width, color) {
    if (this.#lineColor) {
      this.hideLines()
    } else {
      this.showLines(width, color)
    }
  }
  /**
   * Return the grid image including all of it's content sprites
   * @returns {import('./image.js').Image}
   */
  image() {
    return this.#image
  }

  #render() {
    this.#context.reset()
    for (const content of this.#contents) {
      if (!content) continue
      const image = content.image()
      if (!image) continue
      this.#context.drawImage(image, ...content.min())
    }
    if (!!this.#lineColor) {
      for (const line of this.#lines) {
        drawLine(this.#context, line, this.#lineWidth, this.#lineColor)
      }
    }
    if (this.#selected >= 0) {
      const [x, y] = this.indexPos(this.#selected)
      this.#context.lineWidth = this.#selectedWidth
      this.#context.strokeStyle = this.#selectedColor?.hex() || ''
      this.#context.strokeRect(x, y, this.#cw, this.#ch)
    }
  }
}
