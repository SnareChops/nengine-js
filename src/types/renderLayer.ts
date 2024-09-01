import type { Context } from './image.js'
import type { Sprite } from './sprite.js'

export interface RenderLayer {
  order(): number
  draw(screen: Context): void
}

export interface SpriteRenderLayer extends RenderLayer {
  Sprites(): Sprite[]
  AddSprite(sprite: Sprite): void
  RemoveSprite(sprite: Sprite): void
}
