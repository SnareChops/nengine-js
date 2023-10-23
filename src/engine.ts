import { Game } from './game';
import { PANIC, SHOULD_PANIC } from './panic';
import { MOUSE, MouseInfo, mouseInit } from './mouse';

export const CONTEXT = Symbol('CONTEXT');

export class Engine {
    static [PANIC]: number = 0;
    static get [SHOULD_PANIC](): boolean { return (Engine[PANIC] & 1) === 1; }
    static [CONTEXT]: CanvasRenderingContext2D;
    static [MOUSE]: MouseInfo = mouseInit();
    prev: number = 0;
    game: Game;

    constructor(private context: CanvasRenderingContext2D) {
        if (!!Engine[CONTEXT]) throw new Error('Nengine only supports using 1 canvas, and only 1 active engine.');
        Engine[CONTEXT] = context;
        context.canvas.addEventListener('mousemove', event => {
            const rect = context.canvas.getBoundingClientRect();
            Engine[MOUSE].x = event.clientX - rect.left;
            Engine[MOUSE].y = event.clientY - rect.top;
        });
        context.canvas.addEventListener('mousedown', event => Engine[MOUSE].buttons = event.buttons);
        context.canvas.addEventListener('mouseup', event => Engine[MOUSE].buttons = event.buttons);
        context.canvas.addEventListener('wheel', event => {
            Engine[MOUSE].wheelX += event.deltaX;
            Engine[MOUSE].wheelY += event.deltaY;
        }, { passive: true });
    }

    runGame(game: Game) {
        this.game = game;
        window.requestAnimationFrame(this.tick.bind(this));
    }

    tick(timestamp: number) {
        const delta = timestamp - this.prev;
        this.prev = timestamp;
        if (delta > 0) {
            this.game.update(delta);
            Engine[MOUSE].wheelX = 0;
            Engine[MOUSE].wheelY = 0;
            Engine[MOUSE].prevX = Engine[MOUSE].x;
            Engine[MOUSE].prevY = Engine[MOUSE].y;
            Engine[MOUSE].prevButtons = Engine[MOUSE].buttons;
        }
        this.context.reset();
        this.game.draw(this.context);
        if (Engine[PANIC] === 3) return;
        window.requestAnimationFrame(this.tick.bind(this));
    }
}
