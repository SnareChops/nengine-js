import { Raw } from './raw';

export class Physics extends Raw {
    #vx: number = 0;
    #vy: number = 0;
    #ax: number = 0;
    #ay: number = 0;

    constructor(width: number = 0, height: number = 0) {
        super(width, height);
    }
    /** Gets the horizontal and vertical velocity of the bounds */
    velocity(): [h: number, v: number] {
        return [this.#vx, this.#vy];
    }
    /** Sets the horizontal and vertical velocity of the bounds */
    setRawVelocity(x: number, y: number) {
        this.#vx = x;
        this.#vy = y;
    }
    /** Sets the angle and magnitude of the bounds velocity */
    setVelocity(angle: number, magnitude: number) {
        this.#vx = Math.cos(angle) * magnitude;
        this.#vy = Math.sin(angle) * magnitude;
    }
    /** Gets the acceration of the bounds */
    acceleration(): [x: number, y: number] {
        return [this.#ax, this.#ay];
    }
    /** Sets the raw horizontal and vertical accelration of the bounds */
    setRawAcceleration(x: number, y: number) {
        this.#ax = x;
        this.#ay = y;
    }
    /** Sets the angle and magnitude of the bounds acceleration */
    setAcceleration(angle: number, magnitude: number) {
        this.#ax = Math.cos(angle) * magnitude;
        this.#ay = Math.sin(angle) * magnitude;
    }
    /**
     * Updates the state of the bounds
     * Note: This must be called each frame in order to properly
     * apply the velocity and acceleration of the bounds
     */
    update(delta: number) {
        this.#vx += this.#ax * delta;
        this.#vy += this.#ay * delta;
        this.X += this.#vx * delta;
        this.Y += this.#vy * delta;
    }
}