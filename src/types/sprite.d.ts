import { Image } from '../image.js'
import { Bounds } from './bounds.js'

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
  url(): string
  index(): number
  image(): Image
}

export interface DrawableSprite {
  min(): [x: number, y: number]
  dx(): number
  dy(): number
  image(): Image
}