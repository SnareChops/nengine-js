import { Context } from '../image';

/** Represents a game that can be run by the engine */
export interface Game {
    update(delta: number): void;
    draw(screen: Context): void;
    loadScene(scene: string): void;
}