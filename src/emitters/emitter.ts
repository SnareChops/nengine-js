import { Bounds } from '../bounds';
import { Particle } from './particle';

/** Represents a particle emitter */
export interface Emitter extends Bounds {
    /** Gets the current active particles from the emitter */
    particles(): Particle[];
    /** Updates the state of the emitter. Call this every frame */
    update(delta: number);
}