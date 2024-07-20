import * as nengine from '../src/index.js'
import { TestSprite } from './sprite.js'

export class TestScene {
  sprite = new TestSprite()
  sprite2 = new TestSprite()
  renderer = new nengine.Renderer()
  screen = new nengine.Screen(100, 1920, 1080)

  constructor() {
    const [_, context] = nengine.createCanvas(1920, 1080)
    context.fillStyle = 'black'
    context.fillRect(0, 0, 1920, 1080)
    // const background = new nengine.SimpleSprite(canvas);
    // this.renderer.addToBackground(background);
    this.sprite.xy(300, 300)
    this.renderer.addRenderLayer(this.screen)
    this.sprite2.xy(1100, 300)
    this.sprite2.setAnchor(nengine.CENTER, nengine.CENTER)
    this.screen.addSprite(this.sprite)
    this.screen.addSprite(this.sprite2)
  }
  /**
   * @param {number} delta
   */
  update(delta) {
    console.log('delta', delta)
    this.sprite2.setRotation(
      this.sprite2.rotation() + (Math.PI / 8) * (delta / 1000),
    )
  }
  /**
   * @param {nengine.Context} screen
   */
  draw(screen) {
    this.renderer.draw(screen)
  }
}
