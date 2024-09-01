import type { Context } from './image.js'

export interface Scene {
  update(delta: number): void
  draw(ctx: Context): void
}
