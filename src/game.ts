import { DebugTimer, debugEnabled } from './debug';
import { Context } from './image';
import { Key, isKeyJustPressed } from './keyboard';
import { Scene, Loadable, Initable, Destroyable, Reloadable } from './types';

/** 
 * A built-in scene switching Game object
 * Use this to load and switch between scenes or
 * as an example to create your own Game with. In
 * most advanced cases this will not be sufficient
 * and is recommended to craft your own Game object 
 * to meet your needs.
 */
export class BasicGame {
    #scene: Scene | undefined;
    #width: number = 0;
    #height: number = 0;
    #reload: Key | undefined;
    #init: (() => Promise<void>) | undefined;

    #updateTimer: DebugTimer | undefined;
    #drawTimer: DebugTimer | undefined;
    #reloadTimer: DebugTimer | undefined;

    constructor(w: number, h: number, reload?: Key, init?: () => Promise<void>) {
        this.#width = w;
        this.#height = h;
        this.#reload = reload;
        this.#init = init;
        if (debugEnabled()) {
            this.#updateTimer = new DebugTimer("Update");
            this.#drawTimer = new DebugTimer("Draw");
            if (reload) {
                this.#reloadTimer = new DebugTimer("Reload");
            }
        }
    }

    async init(): Promise<void> {
        if (this.#init) return this.#init();
    }

    loadScene(scene: Scene) {
        if (typeof (this.#scene as unknown as Destroyable).destroy === 'function') {
            (this.#scene as unknown as Destroyable).destroy();
        }
        if (typeof (scene as unknown as Loadable).load === 'function') {
            const done = (scene: Scene) => this.#scene = scene;
            this.#scene = (scene as unknown as Loadable).load(done, this);
        } else {
            this.#scene = scene;
        }
        if (typeof (this.#scene as unknown as Initable).init === 'function') {
            (this.#scene as unknown as Initable).init(this);
        }
    }

    update(delta: number): void {
        if (!this.#scene) return;
        if (this.#reload && isKeyJustPressed(this.#reload)) {
            if (typeof (this.#scene as unknown as Reloadable) === 'function') {
                if (this.#reloadTimer) this.#reloadTimer.start();
                (this.#scene as unknown as Reloadable).reload();
                if (this.#reloadTimer) this.#reloadTimer.end();
            }
        }
        if (this.#updateTimer) this.#updateTimer.start();
        // TODO: Fix the first frame bug
        this.#scene.update(delta);
        if (this.#updateTimer) this.#updateTimer.end();
    }

    draw(ctx: Context): void {
        if (!this.#scene) return;
        if (this.#drawTimer) this.#drawTimer.start();
        this.#scene.draw(ctx);
        if (this.#drawTimer) this.#drawTimer.end();
    }

    layout(): [w: number, h: number] {
        return [this.#width, this.#height];
    }
}