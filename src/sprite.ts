import { RawBounds } from './bounds/index.js'
import { getImage } from './loaders/index.js'
import { panic } from './panic.js'
import type { Image, SpriteSource } from './types/index.js'
/**
 * SimpleSprite is a convenience struct for
 * "just drawing a raw image to the screen"
 * Note: Unless your intention is to just draw a
 * static image to the screen with no behavior then
 * it is **strongly** recommended to implement the
 * Sprite interface on your own instead of using this
 */
export class SimpleSprite extends RawBounds {
  #image: Image | undefined

  constructor(image: string | Image) {
    super(0, 0)
    if (typeof image === 'string') {
      const result = getImage(image)
      if (!result) {
        throw panic(
          'SimpleSprite tried to use image',
          image,
          'but received undefined',
        )
      }
      image = result
    }
    this.#image = image
    this.setSize(image.width, image.height)
  }

  image(): Image | undefined {
    return this.#image
  }
}

export class SourceSprite extends RawBounds {
  #source: SpriteSource
  #image: Image | undefined

  constructor(source: SpriteSource) {
    super(0, 0)
    this.#source = source
    this.#image = source.image()
    this.setSize(this.#image?.width || 0, this.#image?.height || 0)
  }

  image(): Image | undefined {
    return this.#image
  }

  reload() {
    this.#image = this.#source.image()
  }
}
