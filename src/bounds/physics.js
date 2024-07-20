import { Raw } from './raw.js'

export class Physics extends Raw {
  /** @type {number} */
  #vx = 0
  /** @type {number} */
  #vy = 0
  /** @type {number} */
  #ax = 0
  /** @type {number} */
  #ay = 0

  /**
   *
   * @param {number} width
   * @param {number} height
   */
  constructor(width = 0, height = 0) {
    super(width, height)
  }
  /**
   * Gets the horizontal and vertical velocity of the bounds
   * @returns {[h: number, v: number]}
   */
  velocity() {
    return [this.#vx, this.#vy]
  }
  /**
   * Sets the horizontal and vertical velocity of the bounds
   * @param {number} x
   * @param {number} y
   */
  setRawVelocity(x, y) {
    this.#vx = x
    this.#vy = y
  }
  /**
   * Sets the angle and magnitude of the bounds velocity
   * @param {number} angle
   * @param {number} magnitude
   */
  setVelocity(angle, magnitude) {
    this.#vx = Math.cos(angle) * magnitude
    this.#vy = Math.sin(angle) * magnitude
  }
  /**
   * Gets the acceration of the bounds
   * @returns {[x: number, y: number]}
   */
  acceleration() {
    return [this.#ax, this.#ay]
  }
  /**
   * Sets the raw horizontal and vertical accelration of the bounds
   * @param {number} x
   * @param {number} y
   */
  setRawAcceleration(x, y) {
    this.#ax = x
    this.#ay = y
  }
  /**
   * Sets the angle and magnitude of the bounds acceleration
   * @param {number} angle
   * @param {number} magnitude
   */
  setAcceleration(angle, magnitude) {
    this.#ax = Math.cos(angle) * magnitude
    this.#ay = Math.sin(angle) * magnitude
  }
  /**
   * Updates the state of the bounds
   * Note: This must be called each frame in order to properly
   * apply the velocity and acceleration of the bounds
   * @param {number} delta
   */
  update(delta) {
    this.#vx += this.#ax * delta
    this.#vy += this.#ay * delta
    this.x(this.x() + this.#vx * delta)
    this.y(this.y() + this.#vy * delta)
  }
}
