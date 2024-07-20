import { Raw } from './raw.js'

export class Relative extends Raw {
  /** @type {import('../types/index.d.ts').Bounds} */
  #parent
  /**
   *
   * @param {import('../types/index.d.ts').Bounds} parent
   * @param {number} w
   * @param {number} h
   */
  constructor(parent, w = 0, h = 0) {
    super(w, h)
    this.#parent = parent
  }
  /**
   * Gets the absolute x,y of the top left corner of the bounds (relative to the parent)
   * @returns {[x: number, y: number]}
   */
  min() {
    const [px, py] = this.#parent.xy()
    const [x, y] = super.min()
    return [px + x, py + y]
  }
}
