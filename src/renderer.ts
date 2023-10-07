import { Bounds, CENTER } from './bounds';
import { ParticleEmitter } from './particle';

export interface Sprite extends Bounds {
    image(): CanvasImageSource;
}

export class Renderer {
    background: Sprite[] = [];
    effects: ParticleEmitter[] = [];
    screen: Sprite[] = [];

    addToBackground(sprite: Sprite) {
        if (this.background.includes(sprite)) return;
        this.screen.push(sprite);
    }

    removeFromBackground(sprite: Sprite) {
        const i = this.background.indexOf(sprite);
        if (i > -1) this.background.splice(i, 1);
    }

    addEffect(effect: ParticleEmitter) {
        if (this.effects.includes(effect)) return;
        this.effects.push(effect);
    }

    removeEffect(effect: ParticleEmitter) {
        const i = this.effects.indexOf(effect);
        if (i > -1) this.effects.splice(i, 1);
    }

    addToScreen(sprite: Sprite) {
        if (this.screen.includes(sprite)) return;
        this.screen.push(sprite);
    }

    removeFromScreen(sprite: Sprite) {
        const i = this.screen.indexOf(sprite);
        if (i > -1) this.screen.splice(i, 1);
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (let effect of this.effects) {
            for (let particle of effect.particles) {
                const image = particle.Image();
                if (!!image) {
                    ctx.drawImage(image, ...particle.rawPos(), particle.width(), particle.height());
                }
            }
        }

        this.screen.sort((a, b) => {
            const [ax, ay, az] = a.vec3();
            const [bx, by, bz] = b.vec3();
            return az - bz;
        });
        for (const item of this.screen) {
            const image = item.image();
            if (!!image) {
                if (item.rotation() != 0) {
                    ctx.translate(...item.vecOf(CENTER, CENTER));
                    ctx.rotate(item.rotation());
                    ctx.drawImage(image, -item.width() / 2, -item.height() / 2, item.width(), item.height())
                    ctx.resetTransform();
                } else {
                    ctx.drawImage(image, ...item.rawPos(), item.width(), item.height());
                }
                ctx.fillStyle = 'blue';
                ctx.fillRect(...item.vecOf(CENTER, CENTER), 1, 1);
            }
        }
    }
}