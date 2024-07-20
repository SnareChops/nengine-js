import { Context } from '../image'

export interface Scene {
  update(delta: number): void
  draw(ctx: Context): void
}