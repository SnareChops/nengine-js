import { RenderLayer } from './renderLayer'
import { Sprite } from './sprite'
import { Key } from '../keyboard.js'

export interface Input extends RenderLayer {
  capture(): void
  isCaptured(): boolean
  content(): Sprite
  setContent(content: Sprite): void
  cursorDelta(): [number, number]
  update(): void
}

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