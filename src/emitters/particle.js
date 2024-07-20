import { PhysicsBounds } from '../bounds/index.js'

/**
 * A utility class that can be used to facilitate in
 * creating particles
 */
export class ParticleBase extends PhysicsBounds {
  /** @type {number} */
  #duration = 0
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width = 0, height = 0) {
    super(width, height)
  }
  /**
   * Gets the duration (lifetime) of a particle (in milliseconds)
   * @returns {number}
   */
  duration() {
    return this.#duration
  }
  /**
   * Sets the duration (lifetime) of a particle (in milliseconds)
   * @param {number} ms
   */
  setDuration(ms) {
    this.#duration = ms
  }
  /**
   * Updates the state of the emitter. Call this every frame
   * @param {number} delta
   */
  update(delta) {
    super.update(delta)
    this.#duration -= delta
  }
}
