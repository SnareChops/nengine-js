import { Box } from './box.js'

export class Relative extends Box {
  #parent: Box

  constructor(parent: Box, w: number = 0, h: number = 0) {
    super(w, h)
    this.#parent = parent
  }
  /** Gets the absolute x,y of the top left corner of the bounds (relative to the parent) */
  min(): [x: number, y: number] {
    const [px, py] = this.#parent.xy()
    const [x, y] = super.min()
    return [px + x, py + y]
  }

  mid(): [x: number, y: number] {
    const [px, py] = this.#parent.xy()
    const [x, y] = super.mid()
    return [px + x, py + y]
  }

  max(): [x: number, y: number] {
    const [px, py] = this.#parent.xy()
    const [x, y] = super.max()
    return [px + x, py + y]
  }
}
