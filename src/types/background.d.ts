import type { Image } from '../image'

export interface Background {
  clearBackground()
  addBackgroundImage(image: Image, offsetX: number, offsetY: number)
}