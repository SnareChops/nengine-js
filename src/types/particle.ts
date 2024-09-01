import { PhysicsBounds } from '../bounds/index.js'
import { Bounds } from './bounds.js'

/**
 * Represents a particle emitter
 */
export interface Emitter extends Bounds {
  particles(): Particle[]
  update(delta: number): void
}
/**
 * Implement this interface to create a particle
 * that can be used with the emitters. {@link ParticleBase}
 * can be used to assist with creating particles
 */
export interface Particle extends PhysicsBounds {
  duration(): number
  setDuration(ms: number): void
  spawn(): void
  despawn(): void
  update(delta: number): void
}
