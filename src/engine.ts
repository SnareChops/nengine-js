import { Game } from './game';

export class Engine {
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
        window.requestAnimationFrame(this.tick.bind(this));
    }
}
