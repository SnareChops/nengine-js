import * as nengine from '../../src';
import { TestScene } from './scene';
export class TestGame {
    #active: nengine.Scene | undefined;

    async init(): Promise<void> {
        await nengine.addImage('TestIcon', 'assets/TestIcon.png');
        this.#active = new TestScene();
    }

    update(delta: number) {
        this.#active!!.update(delta);
    }

    draw(ctx: nengine.Context) {
        this.#active!!.draw(ctx);
    }
}