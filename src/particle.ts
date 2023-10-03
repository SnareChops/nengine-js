import { CENTER, RawBounds } from './bounds';
import * as random from './random';
import * as trig from './trig';

export class ParticleEmitter extends RawBounds {
    particles: Particle[] = [];
    images: HTMLCanvasElement[] = [];
    minVelocity: number = 0;
    maxVelocity: number = 0;
    minAngle: number = 0;
    maxAngle: number = 0;
    minLife: number = 0;
    maxLife: number = 0;
    density: number = 0;
    duration: number = 0;

    init(poolSize: number, images: HTMLCanvasElement[]): this {
        this.images = images;
        this.particles = Array(poolSize);
        for (let i = 0; i < this.particles.length; i++) {
            const idx = Math.floor(Math.random() * this.images.length);
            const image = this.images[idx];
            this.particles[i] = new Particle();
            this.particles[i].setAnchor(CENTER, CENTER);
            this.particles[i].image = image;
        }
        return this;
    }

    setVelocity(min: number, max: number) {
        this.minVelocity = min;
        this.maxVelocity = max;
    }

    setAngle(min: number, max: number) {
        this.minAngle = min;
        this.maxAngle = max;
    }

    setLife(min: number, max: number) {
        this.minLife = min;
        this.maxLife = max;
    }

    setDensity(density: number) {
        this.density = density;
    }

    start(duration: number) {
        this.duration = duration;
    }

    update(delta: number) {
        this.duration -= delta;
        if (this.duration <= 0) {
            this.duration = 0;
        }
        let desired = (delta / 10) * this.density;
        for (let particle of this.particles) {
            if (particle.active) {
                particle.update(delta)
            } else {
                if (desired > 0 && this.duration > 0) {
                    const [x, y] = this.vec2();
                    particle.start(
                        x,
                        y,
                        random.intn(this.maxLife - this.minLife) + this.minLife,
                        random.floatn(this.maxVelocity - this.minVelocity) + this.minVelocity,
                        random.floatn(this.maxAngle - this.minAngle) + this.minAngle,
                    )
                    desired -= 1
                }
            }
        }
    }
}

class Particle extends RawBounds {
    image: CanvasImageSource;
    active: boolean = false;
    life: number = 0;
    velocity: number = 0;
    angle: number = 0;

    start(x: number, y: number, life: number, velocity: number, angle: number) {
        this.active = true;
        this.life = life;
        this.velocity = velocity;
        this.angle = angle;
        this.setVec2(x, y);
    }

    update(delta: number) {
        if (!this.active) {
            return
        }
        this.life -= delta;
        if (this.life <= 0) {
            this.active = false;
            return;
        }
        let [x, y] = this.vec2();
        [x, y] = trig.pointAtAngleWithDistance(x, y, this.angle, this.velocity * delta)
        this.setVec2(x, y);
    }

    Image(): CanvasImageSource | undefined {
        if (this.active) {
            return this.image;
        }
        return void 0;
    }
}