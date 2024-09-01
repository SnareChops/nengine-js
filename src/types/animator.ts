import type { Image } from './image.js'

export interface Animator {
  start(name: string): void
  update(delta: number): void
  image(): Image
}
