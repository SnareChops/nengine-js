import { BOTTOM, CENTER, LEFT, RIGHT, TOP } from './bounds.js'
import { Position } from './position.js'

export class Box extends Position {
  /** @type {number} */
  #w
  /** @type {number} */
  #h
  /** @type {number} */
  #ox = 0
  /** @type {number} */
  #oy = 0
  /** @type {number} */
  #rotation = 0
  /**
   * @param {number} w
   * @param {number} h
   */
  constructor(w = 0, h = 0) {
    super()
    this.#w = w
    this.#h = h
  }
  /**
   * Gets the width,height of the bounds
   * @returns {[number, number]}
   */
  size() {
    return [this.#w, this.#h]
  }
  /**
   * Sets the width,height of the bounds
   * @param {number} w
   * @param {number} h
   */
  setSize(w, h) {
    this.#w = w
    this.#h = h
  }
  /**
   * Resize the bounds maintaining the anchor point
   * @param {number} w
   * @param {number} h
   */
  resize(w, h) {
    const [ow, oh] = this.size()
    this.#w = w
    this.#h = h
    this.#ox = this.#ox * (w / ow)
    this.#oy = this.#oy * (h / oh)
  }
  /**
   * Gets the relative x,y offset of the bounds
   * @returns {[number, number]}
   */
  offset() {
    return [this.#ox, this.#oy]
  }
  /**
   * Sets the relative x,y offset of the bounds
   * @param {number} x
   * @param {number} y
   */
  setOffset(x, y) {
    this.#ox = x
    this.#oy = y
  }
  /**
   * Gets the rotation of the bounds (in radians)
   * @returns {number}
   */
  rotation() {
    return this.#rotation
  }
  /**
   * Sets the rotation of the bounds (in radians)
   * @param {number} radians
   */
  setRotation(radians) {
    this.#rotation = radians
  }

  /**
   * SetAnchor sets the anchor point of the bounds to base it's position off
   * Valid options for x: LEFT CENTER RIGHT
   * Valid options for y: TOP CENTER BOTTOM
   * @param {number} x
   * @param {number} y
   */
  setAnchor(x, y) {
    switch (x) {
      case LEFT:
        this.#ox = 0
        break
      case CENTER:
        this.#ox = this.dx() / 2
        break
      case RIGHT:
        this.#ox = this.dx() - 1
        break
    }
    switch (y) {
      case TOP:
        this.#oy = 0
        break
      case CENTER:
        this.#oy = this.dy() / 2
        break
      case BOTTOM:
        this.#oy = this.dy() - 1
        break
    }
  }
  /**
   * Gets the width of the bounds
   * @returns {number}
   */
  dx() {
    return this.#w
  }
  /**
   * Gets the height of the bounds
   * @returns {number}
   */
  dy() {
    return this.#h
  }
  /**
   * Gets the width of the bounds
   * @alias dx
   * @returns {number}
   */
  width() {
    return this.#w
  }
  /**
   * Gets the height of the bounds
   * @alias dy
   * @returns {number}
   */
  height() {
    return this.#h
  }
  /**
   * @returns {[x: number, y: number]}
   */
  min() {
    const x = this.x() - this.#ox
    const y = this.y() - this.#oy
    return [x, y]
  }
  /**
   * @returns {[x: number, y: number]}
   */
  mid() {
    const x = this.#w / 2 + this.x() - this.#ox
    const y = this.#h / 2 + this.y() - this.#oy
    return [x, y]
  }
  /**
   * @returns {[x: number, y: number]}
   */
  max() {
    const x = this.x() - this.#ox + this.#w - 1
    const y = this.y() - this.#oy + this.#h - 1
    return [x, y]
  }
  /**
   * @returns {number}
   */
  midX() {
    return this.#w / 2 + this.x() - this.#ox
  }
  /**
   * @returns {number}
   */
  midY() {
    return this.#h / 2 + this.y() - this.#oy
  }
  /**
   * @returns {number}
   */
  maxX() {
    return this.x() - this.#ox + this.#w - 1
  }
  /**
   * @returns {number}
   */
  maxY() {
    return this.y() - this.#oy + this.#h - 1
  }
}
