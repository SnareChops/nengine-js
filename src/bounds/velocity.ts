import { Vector } from '../types/index.js'
import { Raw } from './raw.js'

export class VelocityBounds extends Raw {
  #velocity: Vector = new Vector(0, 0)

  velocity(): Vector {
    return this.#velocity
  }

  setVelocity(velocity: Vector) {
    this.#velocity = velocity
  }

  update(delta: number) {
    const [x, y] = this.xy()
    this.xy(x + this.#velocity.x * delta, y + this.#velocity.y * delta)
  }
}
