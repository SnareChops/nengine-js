import { Vector } from '../types/index.js'

export class Position {
  #x: number = 0
  #y: number = 0
  #z: number = 0

  constructor(x: number = 0, y: number = 0) {
    this.#x = x
    this.#y = y
  }
  /** returns the x and y components as a vector */
  vec(): Vector {
    return new Vector(this.#x, this.#y)
  }
  pos(): Position {
    return this
  }
  /**
   * Sets the x and y components from a 2d vector
   * Note: Only use this if you already have a vector from other
   * calculations. Otherwise use setPos2(), setPos3(), or xy()
   */
  setPos(pos: Vector) {
    this.#x = pos.x
    this.#y = pos.y
  }
  /** pos2 returns the x and y components of the point */
  pos2(): [x: number, y: number] {
    return [this.#x, this.#y]
  }
  /** pos3 returns all components of the point (x, y, z) */
  pos3(): [x: number, y: number, z: number] {
    return [this.#x, this.#y, this.#z]
  }
  /** setPos2 sets the x and y components of the point */
  setPos2(x: number, y: number) {
    this.#x = x
    this.#y = y
  }
  /** setPos3 sets the x, y, z components of the point */
  setPos3(x: number, y: number, z: number) {
    this.#x = x
    this.#y = y
    this.#z = z
  }
  /** Gets and/or sets the x position of the point */
  x(x?: number): number {
    if (typeof x === 'number') this.#x = x
    return this.#x
  }
  /** Gets and/or sets the y position of the point */
  y(y?: number): number {
    if (typeof y === 'number') this.#y = y
    return this.#y
  }
  /** Gets and/or sets the z position of the point */
  z(z?: number): number {
    if (typeof z === 'number') this.#z = z
    return this.#z
  }
  /** Gets and/or sets the x,y positions of the point */
  xy(x?: number, y?: number): [x: number, y: number] {
    return [this.x(x), this.y(y)]
  }
  /** Gets and/or sets the y,z positions of the point */
  yz(y?: number, z?: number): [y: number, z: number] {
    return [this.y(y), this.z(z)]
  }
  /** Gets and/or sets the x,z positions of the point */
  xz(x?: number, z?: number): [x: number, z: number] {
    return [this.x(x), this.z(z)]
  }
  /** Gets and/or sets the x,y,z positions of the point */
  xyz(x?: number, y?: number, z?: number): [x: number, y: number, z: number] {
    return [this.x(x), this.y(y), this.z(z)]
  }
  /** Aligns the position to the grid */
  gridAlign(h: number, v: number) {
    this.#x = Math.floor(this.#x / h) * h
    this.#y = Math.floor(this.#y / v) * v
  }
}
