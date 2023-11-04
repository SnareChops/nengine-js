import { Context } from './image';

export interface Game {
    update(delta: number): void;
    draw(context: Context): void;
}