import { Vector } from '../types/index.js'
import { Box } from './box.js'

/**
 * A slimmed down projectile bounds with the minimum amount
 * of memory usage for supporting many simple projectiles
 * Should work with most things that you need for projectiles
 * but by design is a subset of Bounds functionality
 */
export class Projectile extends Box {
  #velocity: Vector = new Vector(0, 0)

  velocity(): Vector {
    return this.#velocity
  }

  setVelocity(velocity: Vector) {
    this.#velocity = velocity
  }

  update(delta: number) {
    const [x, y] = this.pos2()
    this.setPos2(x + this.#velocity.x * delta, y + this.#velocity.y * delta)
  }
}
