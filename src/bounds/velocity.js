import { Vector } from '../types/vector.js'
import { Raw } from './raw.js'

export class VelocityBounds extends Raw {
  /** @type {Vector} */
  #velocity = new Vector(0, 0)
  /**
   * @returns {Vector}
   */
  velocity() {
    return this.#velocity
  }
  /**
   * @param {Vector} velocity
   */
  setVelocity(velocity) {
    this.#velocity = velocity
  }
  /**
   * @param {number} delta
   */
  update(delta) {
    const [x, y] = this.xy()
    this.xy(x + this.#velocity.x * delta, y + this.#velocity.y * delta)
  }
}
