import * as nengine from '../../src';
import { DynamicBar } from './bar';
import { TestSprite } from './sprite';

export class TestScene {
    sprite: nengine.Sprite = new TestSprite();
    sprite2: nengine.Sprite = new TestSprite();
    bar: nengine.Sprite = new DynamicBar(250, 25, new nengine.Color(255, 0, 0, 255));
    renderer: nengine.Renderer = new nengine.Renderer(1920, 1080);

    constructor() {
        console.log('test');
        const [canvas, context] = nengine.createCanvas(1920, 1080);
        context.fillStyle = 'black';
        context.fillRect(0, 0, 1920, 1080);
        // const background = new nengine.SimpleSprite(canvas);
        // this.renderer.addToBackground(background);
        this.sprite.xy(300, 300);
        this.renderer.addToScreen(this.sprite);
        this.sprite2.xy(1100, 300);
        this.sprite2.setAnchor(nengine.CENTER, nengine.CENTER);
        this.sprite2.setScale(1.5);
        this.renderer.addToScreen(this.sprite2);
        this.bar.xy(500, 500);
        this.renderer.addToScreen(this.bar);
    }

    update(delta: number) {
        this.sprite2.setRotation(this.sprite2.rotation() + Math.PI / 8 * (delta / 1000));
    }

    draw(screen: nengine.Context) {
        this.renderer.draw(screen);
    }
}