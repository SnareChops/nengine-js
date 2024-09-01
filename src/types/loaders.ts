import { Image } from './image.js'

export interface Anim {
  duration: number
  frameWidth: number
  frameHeight: number
  frames: Image[]
}
