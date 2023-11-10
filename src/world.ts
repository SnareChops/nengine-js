import { RawBounds } from './bounds';
import { Renderer } from './rendering/renderer';
import { Entity } from './types/entity';
import { Sprite } from './types/sprite';

export class World extends RawBounds {
    #renderer: Renderer;
    #entities: Entity[] = [];

    constructor(viewWidth: number, viewHeight: number, worldWidth: number, worldHeight: number) {
        super(worldWidth, worldHeight);
        this.#renderer = new Renderer(viewWidth, viewHeight, worldWidth, worldHeight);
    }

    entities(): Entity[] {
        return this.#entities;
    }

    addEntity(entity: Entity) {
        this.#entities.push(entity);
        if ('image' in entity && typeof entity.image === 'function') {
            this.#renderer.addToWorld(entity as Sprite);
        }
    }

    removeEntity(entity: Entity) {
        for (const [i, e] of this.#entities.entries()) {
            if (e === entity) {
                this.#entities.splice(i, 1);
                if ('image' in entity && typeof entity.image === 'function') {
                    this.#renderer.removeFromWorld(entity as Sprite);
                }
            }
        }
    }

    update(delta: number) {
        for (const entity of this.#entities) {
            entity.update(delta);
        }
        this.#renderer.update(delta);
    }
}