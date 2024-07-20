import { RawBounds } from '../bounds/index.js'

export class Projectile extends RawBounds {
  /** @type {import('../types/index.js').Particle[]} */
  #particles = []

  constructor() {
    super(0, 0)
  }
  /**
   * Gets the current active particles from the emitter
   * @returns {import('../types/index.js').Particle[]}
   */
  particles() {
    return this.#particles
  }
  /**
   * Fires the provided particle
   * @param {import('../types/index.js').Particle} particle
   * @param {number} duration
   * @param {number} angle
   * @param {number} velocity
   */
  fire(particle, duration, angle, velocity) {
    particle.xy(...this.xy())
    particle.setDuration(duration)
    particle.setVelocity(angle, velocity)
    particle.spawn()
    this.#particles.push(particle)
  }
  /**
   * Updates the state of the emitter. Call this every frame
   * @param {number} delta
   */
  update(delta) {
    let i = 0
    while (i < this.#particles.length) {
      this.#particles[i].update(delta)
      if (this.#particles[i].duration() <= 0) {
        this.#particles[i].despawn()
        this.#particles.splice(i, 1)
      } else {
        i += 1
      }
    }
  }
}
