import * as nengine from '../../src';
import { TestSprite } from './sprite';

export class TestScene {
    sprite: nengine.Sprite = new TestSprite();
    sprite2: nengine.Sprite = new TestSprite();
    renderer: nengine.Renderer = new nengine.Renderer();

    constructor() {
        this.sprite.setVec2(300, 300);
        this.renderer.addToScreen(this.sprite);
        this.sprite2.setVec2(1100, 300);
        this.sprite2.setAnchor(nengine.CENTER, nengine.CENTER);
        this.sprite2.setScale(1.5);
        this.renderer.addToScreen(this.sprite2);
    }

    update(delta: number) {
        this.sprite2.setRotation(this.sprite2.rotation() + Math.PI / 8 * (delta / 1000));
    }

    draw(screen: CanvasRenderingContext2D) {
        this.renderer.draw(screen);
    }
}