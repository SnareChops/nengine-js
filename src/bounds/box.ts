import { BOTTOM, CENTER, LEFT, RIGHT, TOP } from './bounds.js'
import { Position } from './position.js'

// TODO: Add flipping support
export class Box extends Position {
  #w: number
  #h: number
  #ox: number = 0
  #oy: number = 0
  #rotation: number = 0

  constructor(w: number = 0, h: number = 0) {
    super()
    this.#w = w
    this.#h = h
  }
  /** Gets the width,height of the bounds */
  size(): [w: number, h: number] {
    return [this.#w, this.#h]
  }
  /** Sets the width,height of the bounds */
  setSize(w: number, h: number) {
    this.#w = w
    this.#h = h
  }
  /** Resize the bounds maintaining the anchor point */
  resize(w: number, h: number) {
    const [ow, oh] = this.size()
    this.#w = w
    this.#h = h
    this.#ox = this.#ox * (w / ow)
    this.#oy = this.#oy * (h / oh)
  }
  /** Gets the relative x,y offset of the bounds */
  offset(): [x: number, y: number] {
    return [this.#ox, this.#oy]
  }
  /** Sets the relative x,y offset of the bounds */
  setOffset(x: number, y: number) {
    this.#ox = x
    this.#oy = y
  }
  /** Gets the rotation of the bounds (in radians) */
  rotation(): number {
    return this.#rotation
  }
  /** Sets the rotation of the bounds (in radians) */
  setRotation(radians: number) {
    this.#rotation = radians
  }
  /**
   * SetAnchor sets the anchor point of the bounds to base it's position off
   * Valid options for x: LEFT CENTER RIGHT
   * Valid options for y: TOP CENTER BOTTOM
   */
  setAnchor(x: number, y: number) {
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
  /** Gets the width of the bounds */
  dx(): number {
    return this.#w
  }
  /** Gets the height of the bounds */
  dy(): number {
    return this.#h
  }
  /**
   * Gets the width of the bounds
   * @alias dx
   */
  width(): number {
    return this.#w
  }
  /**
   * Gets the height of the bounds
   * @alias dy
   */
  height(): number {
    return this.#h
  }

  min(): [x: number, y: number] {
    const x = this.x() - this.#ox
    const y = this.y() - this.#oy
    return [x, y]
  }

  mid(): [x: number, y: number] {
    const x = this.#w / 2 + this.x() - this.#ox
    const y = this.#h / 2 + this.y() - this.#oy
    return [x, y]
  }

  max(): [x: number, y: number] {
    const x = this.x() - this.#ox + this.#w - 1
    const y = this.y() - this.#oy + this.#h - 1
    return [x, y]
  }

  minX(): number {
    return this.x() - this.#ox
  }

  minY(): number {
    return this.y() - this.#oy
  }

  midX(): number {
    return this.#w / 2 + this.x() - this.#ox
  }

  midY(): number {
    return this.#h / 2 + this.y() - this.#oy
  }

  maxX(): number {
    return this.x() - this.#ox + this.#w - 1
  }

  maxY(): number {
    return this.y() - this.#oy + this.#h - 1
  }
}

export function NewBox(w: number = 0, h: number = 0): Box {
  return new Box(w, h)
}
