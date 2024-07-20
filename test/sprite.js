import * as nengine from '../src/index.js'

export class TestSprite extends nengine.RawBounds {
  /** @type {nengine.Image} */
  #image
  constructor() {
    super(32, 32)
    this.#image = nengine.getImage('TestIcon')
  }
  /**
   * @returns {nengine.Image}
   */
  image() {
    return this.#image
  }
}
