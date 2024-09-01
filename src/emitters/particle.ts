import { PhysicsBounds } from '../bounds/index.js'

/**
 * A utility class that can be used to facilitate in
 * creating particles
 */
export class ParticleBase extends PhysicsBounds {
  #duration: number = 0

  constructor(width: number = 0, height: number = 0) {
    super(width, height)
  }
  /** Gets the duration (lifetime) of a particle (in milliseconds) */
  duration(): number {
    return this.#duration
  }
  /** Sets the duration (lifetime) of a particle (in milliseconds) */
  setDuration(ms: number) {
    this.#duration = ms
  }
  /** Updates the state of the emitter. Call this every frame */
  update(delta: number) {
    super.update(delta)
    this.#duration -= delta
  }
}
