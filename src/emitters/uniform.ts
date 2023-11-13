import { RawBounds } from '../bounds';
import { Particle } from './particle';
import { linearInterpolate } from '../utils/trig';

export class Uniform extends RawBounds {
    #particles: Particle[];
    #active: Particle[];
    #velocity: number = 0;
    #minAngle: number = 0;
    #maxAngle: number = 0;
    #life: number = 0;
    #density: number = 0;

    constructor(particles: Particle[]) {
        super(0, 0);
        this.#particles = particles;
        this.#active = new Array(particles.length);
    }
    /** Sets the velocity for emitted particles */
    setVelocity(velocity: number) {
        this.#velocity = velocity;
    }
    /** Sets the angle range for the emitted particles (in radians) */
    setAngle(min: number, max: number) {
        this.#minAngle = min;
        this.#maxAngle = max;
    }
    /** Sets the duration lifetime for the emitted particles */
    setLife(life: number) {
        this.#life = life;
    }
    /** Set the density of the emitted particles */
    setDensity(density: number) {
        this.#density = density;
    }
    /** Gets the current active particles from the emitter */
    particles(): Particle[] {
        return this.#active;
    }
    /** Starts the emitter */
    start() {
        for (let i = 0; i < this.#density; i++) {
            for (const particle of this.#particles) {
                if (particle.duration() > 0) {
                    continue;
                }
                const percent = i / this.#density;
                const angle = linearInterpolate(this.#minAngle, this.#maxAngle, percent);
                particle.xy(...this.xy());
                particle.setDuration(this.#life);
                particle.setVelocity(angle, this.#velocity);
                particle.spawn();
                for (const [i, active] of this.#active.entries()) {
                    if (!active) {
                        this.#active[i] = particle;
                        break;
                    }
                }
                break;
            }
        }
    }
    /** Updates the emitter */
    update(delta: number) {
        if (this.#active.length === 0) return;
        let i = 0;
        while (i < this.#active.length) {
            this.#active[i].update(delta);
            if (this.#active[i].duration() <= 0) {
                this.#active[i].despawn();
                this.#active.splice(i, 1);
            } else {
                i += 1;
            }
        }
    }
}