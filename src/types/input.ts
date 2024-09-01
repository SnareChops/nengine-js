import { Key } from '../input/index.js'

export interface KeyInfo {
  pressed: Key[]
  prev: Key[]
  chars: string[]
  shift: boolean
  control: boolean
  alt: boolean
  meta: boolean
}

export interface MouseInfo {
  x: number
  y: number
  prevX: number
  prevY: number
  buttons: number
  prevButtons: number
  wheelX: number
  wheelY: number
}
