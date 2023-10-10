import { Game } from './game';
import { PANIC, SHOULD_PANIC } from './panic';

export class Engine {
    static [PANIC]: number = 0;
    static get [SHOULD_PANIC](): boolean { return (Engine[PANIC] & 1) === 1; }
    prev: number = 0;
    game: Game;

    constructor(private context: CanvasRenderingContext2D) { }

    runGame(game: Game) {
        this.game = game;
        window.requestAnimationFrame(this.tick.bind(this));
    }

    tick(timestamp: number) {
        const delta = timestamp - this.prev;
        this.prev = timestamp;
        if (delta > 0) {
            this.game.update(delta);
        }
        this.context.reset();
        this.game.draw(this.context);
        if (Engine[PANIC] === 3) return;
        window.requestAnimationFrame(this.tick.bind(this));
    }
}
