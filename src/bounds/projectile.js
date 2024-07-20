import { Vector } from '../types/vector.js'
import { Box } from './box.js'

/**
 * A slimmed down projectile bounds with the minimum amount
 * of memory usage for supporting many simple projectiles
 * Should work with most things that you need for projectiles
 * but by design is a subset of Bounds functionality
 */
export class Projectile extends Box {
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
    const [x, y] = this.pos2()
    this.setPos2(x + this.#velocity.x * delta, y + this.#velocity.y * delta)
  }
}
