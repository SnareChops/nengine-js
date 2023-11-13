import { RawBounds } from './bounds';
import { Context } from './image';
import { Renderer } from './rendering/renderer';
import { Entity } from './types/entity';
import { Sprite } from './types/sprite';

/** Represents a "world" that can manage entities and includes a renderer and camera */
export class World extends RawBounds {
    #renderer: Renderer;
    #entities: Entity[] = [];

    constructor(viewWidth: number, viewHeight: number, worldWidth: number, worldHeight: number) {
        super(worldWidth, worldHeight);
        this.#renderer = new Renderer(viewWidth, viewHeight, worldWidth, worldHeight);
    }
    /** Gets the entities in the world */
    entities(): Entity[] {
        return this.#entities;
    }
    /** 
     * Adds an entity to the world 
     * If the entity is also a sprite (ie. has an image() function)
     * then this also adds the entity to the renderer
     */
    addEntity(entity: Entity) {
        this.#entities.push(entity);
        if ('image' in entity && typeof entity.image === 'function') {
            this.#renderer.addToWorld(entity as Sprite);
        }
    }
    /**
     * Removes an entity from the world 
     * If the entity is also a sprite (ie. has an image() function)
     * then this also removes the entity from the renderer
     */
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
    /** Updates the world */
    update(delta: number) {
        for (const entity of this.#entities) {
            entity.update(delta);
        }
        this.#renderer.update(delta);
    }
    // Exposing renderer functions
    /**
     * Adds a sprite to the world renderer
     * Use this to add a sprite to the world
     * Note: In most cases you probably want `addEntity()` instead
     */
    addToWorld(sprite: Sprite) {
        return this.#renderer.addToWorld(sprite);
    }
    /**
     * Removes a sprite from the world renderer
     * Use this to remove a sprite from the world
     * Note: In most cases you probably want `removeEntity()` instead
     */
    removeFromWorld(sprite: Sprite) {
        return this.#renderer.removeFromWorld(sprite);
    }
    /** Adds a sprite to the screen */
    addToScreen(sprite: Sprite) {
        return this.#renderer.addToScreen(sprite);
    }
    /** Removes a sprite from the screen */
    removeFromScreen(sprite: Sprite) {
        return this.#renderer.removeFromScreen(sprite);
    }
    /** Gets the world position of the cursor */
    cursorWorldPosition(): [x: number, y: number] {
        return this.#renderer.cursorWorldPosition();
    }
    /** Adds the sprite to the background */
    addToBackground(sprite: Sprite) {
        return this.#renderer.addToBackground(sprite);
    }
    /** Removes the sprite from the background */
    removeFromBackground(sprite: Sprite) {
        return this.#renderer.removeFromBackground(sprite);
    }
    /** 
     * Draw the result of the Renderer to the provided context
     * (usually the screen)
     */
    draw(ctx: Context) {
        return this.#renderer.draw(ctx);
    }
}