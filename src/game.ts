import { DebugTimer } from './debug/index.js'
import { Key, isKeyJustPressed } from './input/index.js'
import type { Scene, Context } from './types/index.js'
import * as console from './console/index.js'
import * as input from './input/index.js'
import * as debug from './debug/index.js'

/**
 * A built-in scene switching Game object
 * Use this to load and switch between scenes or
 * as an example to create your own Game with. In
 * most advanced cases this will not be sufficient
 * and is recommended to craft your own Game object
 * to meet your needs.
 */
export class BasicGame {
  #scene: Scene | undefined
  #width: number = 0
  #height: number = 0
  #prev: number = 0
  #reload: Key | undefined
  #init: (() => Promise<void>) | undefined
  #updateTimer: DebugTimer
  #drawTimer: DebugTimer
  #reloadTimer: DebugTimer | undefined

  constructor(w: number, h: number, consoleKey: Key = Key.F1, reload?: Key, init?: () => Promise<void>) {
    this.#width = w
    this.#height = h
    this.#reload = reload
    this.#init = init
    console.init(consoleKey)
    this.#updateTimer = new DebugTimer('Update')
    this.#drawTimer = new DebugTimer('Draw')
    if (reload) {
      this.#reloadTimer = new DebugTimer('Reload')
    }
  }

  async init(): Promise<void> {
    if (this.#init) return this.#init()
  }

  loadScene(scene: Scene) {
    // @ts-expect-error
    if (this.#scene && typeof this.#scene.destroy === 'function') {
      // @ts-expect-error
      this.#scene.destroy()
    }
    this.#scene = void 0
    // @ts-expect-error
    if (typeof scene.load === 'function') {
      const done: (scene: Scene) => any = (scene) => (this.#scene = scene)
      // @ts-expect-error
      this.#scene = scene.load(done, this)
    } else {
      this.#scene = scene
    }
    // @ts-expect-error
    if (typeof this.#scene.init === 'function') {
      // @ts-expect-error
      this.#scene.init(this)
    }
    input.reset()
  }
  /**
   * @param {number} delta
   */
  update(delta: number) {
    if (!this.#scene) return
    input.update()
    if (this.#reload && isKeyJustPressed(this.#reload)) {
      // @ts-expect-error
      if (typeof this.#scene.reload === 'function') {
        input.inputCapture()
        if (this.#reloadTimer) this.#reloadTimer.start()
        // @ts-expect-error
        this.#scene.reload()
        if (this.#reloadTimer) this.#reloadTimer.end()
      }
    }
    this.#updateTimer.start()
    // TODO: Fix the first frame bug
    if (this.#prev !== 0) {
      this.#scene.update(delta)
      console.update(delta)
    }
    this.#prev = delta
    this.#updateTimer.end()
    debug.update()
  }

  draw(ctx: Context) {
    if (!this.#scene) return
    this.#drawTimer.start()
    this.#scene.draw(ctx)
    input.draw(ctx)
    console.draw(ctx)
    this.#drawTimer.end()
    debug.draw(ctx)
  }

  layout(): [w: number, h: number] {
    return [this.#width, this.#height]
  }
}
