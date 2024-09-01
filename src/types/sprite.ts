import type { Image } from './image.js'
import type { Bounds } from './bounds.js'

/**
 * Implement this interface to form a "sprite" that
 * the renderer can draw automatically
 */
export interface Sprite extends Bounds {
  image(): Image | undefined
}

export interface UpdatableSprite extends Sprite {
  update(delta: number): void
}

export interface SpriteSource {
  alias(): string
  index(): number
  image(): Image
}

/** @deprecated */
export interface DrawableSprite {
  min(): [x: number, y: number]
  dx(): number
  dy(): number
  image(): Image
}
