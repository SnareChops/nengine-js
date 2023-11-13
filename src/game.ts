import { Context } from './image';

/** Represents a game that can be run by the engine */
export interface Game {
    init?(): Promise<void>;
    update(delta: number): void;
    draw(context: Context): void;
}