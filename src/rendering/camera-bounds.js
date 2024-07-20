export class CameraBounds {
  /** @type {number} */
  #x = 0
  /** @type {number} */
  #y = 0
  /** @type {number} */
  #w = 0
  /** @type {number} */
  #h = 0
  /** @type {number} */
  #ox = 0
  /** @type {number} */
  #oy = 0
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    this.#w = Math.floor(width)
    this.#h = Math.floor(height)
    this.#ox = this.#w / 2
    this.#oy = this.#h / 2
  }
  /**
   * @returns {[x: number, y: number]}
   */
  pos() {
    return [this.#x, this.#y]
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  setPos(x, y) {
    this.#x = x
    this.#y = y
  }
  /**
   * @returns {[w: number, h: number]}
   */
  size() {
    return [this.#w, this.#h]
  }
  /**
   * @param {number} w
   * @param {number} h
   */
  resize(w, h) {
    w = Math.floor(w)
    h = Math.floor(h)
    this.#ox = this.#ox * (w / this.#w)
    this.#oy = this.#oy * (h / this.#h)
    this.#w = w
    this.#h = h
  }
  /**
   * @returns {number}
   */
  width() {
    return this.#w
  }
  /**
   * @returns {number}
   */
  height() {
    return this.#h
  }
  /**
   * @returns {number}
   */
  dx() {
    return this.#w
  }
  /**
   * @returns {number}
   */
  dy() {
    return this.#h
  }
  /**
   * @returns {[x: number, y: number]}
   */
  min() {
    return [this.#x - this.#ox, this.#y - this.#oy]
  }
  /**
   * @returns {[x: number, y: number]}
   */
  max() {
    return [this.#x - this.#ox + this.#w, this.#y - this.#oy + this.#h]
  }
  /**
   * @param {number} [x]
   * @returns {number}
   */
  x(x) {
    if (!!x) this.#x = x
    return this.#x
  }
  /**
   * @param {number} [y]
   * @returns {number}
   */
  y(y) {
    if (!!y) this.#y = y
    return this.#y
  }
  /**
   * @returns {number}
   */
  minX() {
    return this.#x - this.#ox
  }
  /**
   * @returns {number}
   */
  minY() {
    return this.#y - this.#oy
  }
  /**
   * @returns {number}
   */
  maxX() {
    return this.#x - this.#ox + this.#w
  }
  /**
   * @returns {number}
   */
  maxY() {
    return this.#y - this.#oy + this.#h
  }
  /**
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  isWithin(x, y) {
    const [x1, y1] = this.min()
    const [x2, y2] = this.max()
    return x >= x1 && x <= x2 && y >= y1 && y <= y2
  }
}
