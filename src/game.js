import { DebugTimer, debugEnabled } from './debug/index.js'
import { Key, isKeyJustPressed } from './keyboard.js'

/**
 * A built-in scene switching Game object
 * Use this to load and switch between scenes or
 * as an example to create your own Game with. In
 * most advanced cases this will not be sufficient
 * and is recommended to craft your own Game object
 * to meet your needs.
 */
export class BasicGame {
  /** @type {import('./types/index.js').Scene|undefined} */
  #scene
  /** @type {number} */
  #width = 0
  /** @type {number} */
  #height = 0
  /** @type {Key|undefined} */
  #reload
  /** @type {(() => Promise<void>)|undefined} */
  #init
  /** @type {DebugTimer|undefined} */
  #updateTimer
  /** @type {DebugTimer|undefined} */
  #drawTimer
  /** @type {DebugTimer|undefined} */
  #reloadTimer
  /**
   *
   * @param {number} w
   * @param {number} h
   * @param {Key} [reload]
   * @param {() => Promise<void>} [init]
   */
  constructor(w, h, reload, init) {
    this.#width = w
    this.#height = h
    this.#reload = reload
    this.#init = init
    if (debugEnabled()) {
      this.#updateTimer = new DebugTimer('Update')
      this.#drawTimer = new DebugTimer('Draw')
      if (reload) {
        this.#reloadTimer = new DebugTimer('Reload')
      }
    }
  }
  /**
   * @returns {Promise<void>}
   */
  async init() {
    if (this.#init) return this.#init()
  }
  /**
   * @param {import('./types/index.js').Scene} scene
   */
  loadScene(scene) {
    // @ts-expect-error
    if (this.#scene && typeof this.#scene.destroy === 'function') {
      // @ts-expect-error
      this.#scene.destroy()
    }
    // @ts-expect-error
    if (typeof scene.load === 'function') {
      /** @type {(scene: import('./types/index.js').Scene) => any} */
      const done = (scene) => (this.#scene = scene)
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
  }
  /**
   * @param {number} delta
   */
  update(delta) {
    if (!this.#scene) return
    if (this.#reload && isKeyJustPressed(this.#reload)) {
      // @ts-expect-error
      if (typeof this.#scene.reload === 'function') {
        if (this.#reloadTimer) this.#reloadTimer.start()
        // @ts-expect-error
        this.#scene.reload()
        if (this.#reloadTimer) this.#reloadTimer.end()
      }
    }
    if (this.#updateTimer) this.#updateTimer.start()
    // TODO: Fix the first frame bug
    this.#scene.update(delta)
    if (this.#updateTimer) this.#updateTimer.end()
  }
  /**
   * @param {import('./image.js').Context} ctx
   */
  draw(ctx) {
    if (!this.#scene) return
    if (this.#drawTimer) this.#drawTimer.start()
    this.#scene.draw(ctx)
    if (this.#drawTimer) this.#drawTimer.end()
  }
  /**
   * @returns {[w: number, h: number]}
   */
  layout() {
    return [this.#width, this.#height]
  }
}
