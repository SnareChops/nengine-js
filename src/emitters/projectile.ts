import { RawBounds } from '../bounds/index.js'
import type { Particle } from '../types/index.js'

export class Projectile extends RawBounds {
  #particles: Particle[] = []

  constructor() {
    super(0, 0)
  }
  /** Gets the current active particles from the emitter */
  particles(): Particle[] {
    return this.#particles
  }
  /** Fires the provided particle */
  fire(particle: Particle, duration: number, angle: number, velocity: number) {
    particle.xy(...this.xy())
    particle.setDuration(duration)
    particle.setVelocity(angle, velocity)
    particle.spawn()
    this.#particles.push(particle)
  }
  /** Updates the state of the emitter. Call this every frame */
  update(delta: number) {
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
