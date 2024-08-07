import { RawBounds } from '../bounds/index.js'
import { linearInterpolate } from '../utils/index.js'

export class Uniform extends RawBounds {
  /** @type {import('../types/index.js').Particle[]} */
  #particles
  /** @type {import('../types/index.js').Particle[]} */
  #active
  /** @type {number} */
  #velocity = 0
  /** @type {number} */
  #minAngle = 0
  /** @type {number} */
  #maxAngle = 0
  /** @type {number} */
  #life = 0
  /** @type {number} */
  #density = 0
  /**
   * @param {import('../types/index.js').Particle[]} particles
   */
  constructor(particles) {
    super(0, 0)
    this.#particles = particles
    this.#active = new Array(particles.length)
  }
  /**
   * Sets the velocity for emitted particles
   * @param {number} velocity
   */
  setVelocity(velocity) {
    this.#velocity = velocity
  }
  /**
   * Sets the angle range for the emitted particles (in radians)
   * @param {number} min
   * @param {number} max
   */
  setAngle(min, max) {
    this.#minAngle = min
    this.#maxAngle = max
  }
  /**
   * Sets the duration lifetime for the emitted particles
   * @param {number} life
   */
  setLife(life) {
    this.#life = life
  }
  /**
   * Set the density of the emitted particles
   * @param {number} density
   */
  setDensity(density) {
    this.#density = density
  }
  /**
   * Gets the current active particles from the emitter
   * @returns {import('../types/index.js').Particle[]}
   */
  particles() {
    return this.#active
  }
  /** Starts the emitter */
  start() {
    for (let i = 0; i < this.#density; i++) {
      for (const particle of this.#particles) {
        if (particle.duration() > 0) {
          continue
        }
        const percent = i / this.#density
        const angle = linearInterpolate(this.#minAngle, this.#maxAngle, percent)
        particle.xy(...this.xy())
        particle.setDuration(this.#life)
        particle.setVelocity(angle, this.#velocity)
        particle.spawn()
        for (const [i, active] of this.#active.entries()) {
          if (!active) {
            this.#active[i] = particle
            break
          }
        }
        break
      }
    }
  }
  /**
   * Updates the emitter
   * @param {number} delta
   */
  update(delta) {
    if (this.#active.length === 0) return
    let i = 0
    while (i < this.#active.length) {
      this.#active[i].update(delta)
      if (this.#active[i].duration() <= 0) {
        this.#active[i].despawn()
        this.#active.splice(i, 1)
      } else {
        i += 1
      }
    }
  }
}
