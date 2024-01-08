import { Game } from '../game';
import { Context } from '../image';
import { Scene } from './scene';

export interface Initable {
    init(game: Game): void;
}

export interface Loadable {
    load(done: (scene: Scene) => void, game: Game): Scene;
}

export interface Reloadable {
    reload(): void;
}

export interface Updatable {
    update(delta: number): void;
}

export interface Drawable {
    draw(ctx: Context): void;
}

export interface Destroyable {
    destroy(): void;
}