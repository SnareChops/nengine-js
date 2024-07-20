import { Raw } from '../bounds/raw.js'
import { panic } from '../panic.js'
import * as random from '../random.js'

export class Explosive extends Raw {
  /** @type {import('../types/index.js').Particle[]} */
  #particles
  /** @type {import('../types/index.js').Particle[]} */
  #active
  /** @type {number} */
  #minVelocity = 0
  /** @type {number} */
  #maxVelocity = 0
  /** @type {number} */
  #minAngle = 0
  /** @type {number} */
  #maxAngle = 0
  /** @type {number} */
  #minLife = 0
  /** @type {number} */
  #maxLife = 0
  /** @type {number} */
  #density = 0 // How many particles to emit per 10ms
  /** @type {number} */
  #duration = 0 // How long to emit for
  /**
   * @param {import('../types/index.js').Particle[]} particles
   */
  constructor(particles) {
    super(0, 0)
    this.#particles = particles
    this.#active = new Array(particles.length)
  }
  /**
   * Sets the velocity range for the emitted particles
   * @param {number} min
   * @param {number} max
   */
  setVelocity(min, max) {
    this.#minVelocity = min
    this.#maxVelocity = max
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
   * Sets the liftime range for the emitted particles
   * @param {number} min
   * @param {number} max
   */
  setLife(min, max) {
    if (min <= 0 || max <= 0) {
      throw panic('Life must be greater than 0')
    }
    this.#minLife = min
    this.#maxLife = max
  }
  /**
   * Sets the density of emitted particles
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
  /**
   * Starts the emitter
   * @param {number} duration
   */
  start(duration) {
    this.#duration = duration
  }
  /**
   * Removes a particle from the active particles
   * @param {import('../types/index.js').Particle} particle
   */
  #remove(particle) {
    for (const [i, p] of this.#active.entries()) {
      if (p === particle) {
        particle.despawn()
        this.#active.splice(i, 1)
        return
      }
    }
  }
  /**
   * Updates the state of the emitter. Call this every frame
   * @param {number} delta
   */
  update(delta) {
    this.#duration -= delta
    if (this.#duration <= 0) {
      this.#duration = 0
    }
    let desired = Math.floor((delta / 10) * this.#density)
    for (const particle of this.#particles) {
      if (particle.duration() > 0) {
        particle.update(delta)
        if (particle.duration() <= 0) {
          this.#remove(particle)
        }
      } else {
        if (desired > 0 && this.#duration > 0) {
          particle.xy(...this.xy())
          particle.setDuration(
            random.intn(this.#maxLife - this.#minLife) + this.#minLife,
          )
          particle.setVelocity(
            random.floatn(this.#maxAngle - this.#minAngle) + this.#minAngle,
            random.floatn(this.#maxVelocity - this.#minVelocity) +
              this.#minVelocity,
          )
          particle.spawn()
          for (const [i, active] of this.#active.entries()) {
            if (!active) {
              this.#active[i] = particle
              break
            }
          }
          desired -= 1
        }
      }
    }
  }
}
