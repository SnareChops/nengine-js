import { PhysicsBounds } from '../bounds';

/**
 * Implement this interface to create a particle
 * that can be used with the emitters. {@link ParticleBase}
 * can be used to assist with creating particles
 */
export interface Particle extends PhysicsBounds {
    update(delta: number);
    duration(): number;
    setDuration(ms: number);
    spawn();
    despawn();
}
/**
 * A utility class that can be used to facilitate in
 * creating particles
 */
export class ParticleBase extends PhysicsBounds {
    #duration: number;

    constructor(width: number = 0, height: number = 0) {
        super(width, height);
    }
    /** Gets the duration (lifetime) of a particle (in milliseconds) */
    duration(): number {
        return this.#duration;
    }
    /** Sets the duration (lifetime) of a particle (in milliseconds) */
    setDuration(ms: number) {
        this.#duration = ms;
    }
    /** Updates the state of the emitter. Call this every frame */
    update(delta: number) {
        this.#duration -= delta;
        super.update(delta);
    }
}