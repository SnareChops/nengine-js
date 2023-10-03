import { Renderer, Sprite } from "../../src/renderer";
import { TestSprite } from "./sprite";
import { CENTER } from "../../src/bounds";

export class TestScene {
    sprite: Sprite = new TestSprite();
    sprite2: Sprite = new TestSprite();
    renderer: Renderer = new Renderer();

    constructor() {
        this.sprite.setVec2(300, 300);
        this.renderer.addToScreen(this.sprite);
        this.sprite2.setVec2(1000, 300);
        // this.sprite2.setAnchor(CENTER, CENTER);
        // this.sprite2.setScale(2);
        this.sprite2.setRotation(Math.PI / 4);
        this.renderer.addToScreen(this.sprite2);
    }

    update(delta: number) {
        this.sprite2.setRotation(this.sprite2.rotation() + Math.PI / 8 * (delta / 1000))
    }

    draw(screen: CanvasRenderingContext2D) {
        this.renderer.draw(screen);
    }
}