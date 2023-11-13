import { Context } from './image';

/** Represents a scene */
export interface Scene {
    update(delta: number): void;
    draw(ctx: Context): void;
}