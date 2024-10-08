import { Engine, MOUSE } from '../engine.js'
import { isSet } from '../bit/index.js'
import type { MouseInfo } from '../types/index.js'

export enum MouseButton {
  Left = 1 << 0,
  Right = 1 << 1,
  Middle = 1 << 2,
  Mouse4 = 1 << 3,
  Mouse5 = 1 << 4,
}

export function mouseInit(): MouseInfo {
  return {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    buttons: 0,
    prevButtons: 0,
    wheelX: 0,
    wheelY: 0,
  }
}
/** Gets the cursor position on the canvas */
export function cursorPosition(): [x: number, y: number] {
  return [Engine[MOUSE].x, Engine[MOUSE].y]
}
/** Gets the cursor position difference from last frame to this one */
export function cursorDelta(): [x: number, y: number] {
  return [
    Engine[MOUSE].x - Engine[MOUSE].prevX,
    Engine[MOUSE].y - Engine[MOUSE].prevY,
  ]
}
/** Checks if the specified mouse button is currently pressed */
export function isMouseButtonPressed(button: MouseButton): boolean {
  return isSet(Engine[MOUSE].buttons, button)
}
/** Checks if the specified mouse button was pressed starting this frame */
export function isMouseButtonJustPressed(button: MouseButton): boolean {
  return (
    isSet(Engine[MOUSE].buttons, button) &&
    !isSet(Engine[MOUSE].prevButtons, button)
  )
}
/** Checks if the specified mouse button was released starting this frame */
export function isMouseButtonJustReleased(button: MouseButton): boolean {
  return (
    !isSet(Engine[MOUSE].buttons, button) &&
    isSet(Engine[MOUSE].prevButtons, button)
  )
}
/** Returns the mouse wheel deltas that occurred this frame */
export function wheel(): [x: number, y: number] {
  return [Engine[MOUSE].wheelX, Engine[MOUSE].wheelY]
}
