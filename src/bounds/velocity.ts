import { Vector } from '../types/vector';
import { Raw } from './raw';

export class VelocityBounds extends Raw {
    #velocity: Vector = new Vector(0, 0);

    constructor(width: number = 0, height: number = 0) {
        super(width, height);
    }

    velocity(): Vector {
        return this.#velocity;
    }

    setVelocity(velocity: Vector) {
        this.#velocity = velocity;
    }

    update(delta: number) {
        const [x, y] = this.xy();
        this.xy(x + this.#velocity.X * delta, y + this.#velocity.Y * delta);
    }
}