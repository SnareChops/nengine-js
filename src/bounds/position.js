import { Vector } from '../types/vector.js'
/**
 *
 */
export class Position {
  /** @type {number} */
  #x = 0
  /** @type {number} */
  #y = 0
  /** @type {number} */
  #z = 0
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  constructor(x = 0, y = 0) {
    this.#x = x
    this.#y = y
  }
  /**
   * returns the x and y components as a vector
   * @returns {Vector}
   */
  pos() {
    return new Vector(this.#x, this.#y)
  }
  /**
   * Sets the x and y components from a 2d vector
   * Note: Only use this if you already have a vector from other
   * calculations. Otherwise use setPos2(), setPos3(), or xy()
   * @param {Vector} pos
   */
  setPos(pos) {
    this.#x = pos.x
    this.#y = pos.y
  }
  /**
   * pos2 returns the x and y components of the point
   * @returns {[x: number, y: number]}
   */
  pos2() {
    return [this.#x, this.#y]
  }
  /**
   * pos3 returns all components of the point (x, y, z)
   * @returns {[x: number, y: number, z: number]}
   */
  pos3() {
    return [this.#x, this.#y, this.#z]
  }
  /**
   * setPos2 sets the x and y components of the point
   * @param {number} x
   * @param {number} y
   */
  setPos2(x, y) {
    this.#x = x
    this.#y = y
  }
  /**
   * setPos3 sets the x, y, z components of the point
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  setPos3(x, y, z) {
    this.#x = x
    this.#y = y
    this.#z = z
  }
  /**
   * Gets and/or sets the x position of the point
   * @param {number} [x]
   * @returns {number}
   */
  x(x) {
    if (typeof x === 'number') this.#x = x
    return this.#x
  }
  /**
   * Gets and/or sets the y position of the point
   * @param {number} [y]
   * @returns {number}
   */
  y(y) {
    if (typeof y === 'number') this.#y = y
    return this.#y
  }
  /**
   * Gets and/or sets the z position of the point
   * @param {number} [z]
   * @returns {number}
   */
  z(z) {
    if (typeof z === 'number') this.#z = z
    return this.#z
  }
  /**
   * Gets and/or sets the x,y positions of the point
   * @param {number} [x]
   * @param {number} [y]
   * @returns {[x: number, y: number]}
   */
  xy(x, y) {
    return [this.x(x), this.y(y)]
  }
  /**
   * Gets and/or sets the y,z positions of the point
   * @param {number} [y]
   * @param {number} [z]
   * @returns {[y: number, z: number]}
   */
  yz(y, z) {
    return [this.y(y), this.z(z)]
  }
  /**
   * Gets and/or sets the x,z positions of the point
   * @param {number} [x]
   * @param {number} [z]
   * @returns {[x: number, z: number]}
   */
  xz(x, z) {
    return [this.x(x), this.z(z)]
  }
  /**
   * Gets and/or sets the x,y,z positions of the point
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {[x: number, y: number, z: number]}
   */
  xyz(x, y, z) {
    return [this.x(x), this.y(y), this.z(z)]
  }
  /**
   * Aligns the position to the grid
   * @param {number} h the horizontal cell size of the grid
   * @param {number} v the vertical cell size of the grid
   */
  gridAlign(h, v) {
    this.#x = Math.floor(this.#x / h) * h
    this.#y = Math.floor(this.#y / v) * v
  }
}
