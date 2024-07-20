import { Engine, MOUSE } from './engine.js'
import { isSet } from './bit/index.js'
/**
 * @readonly
 * @enum {number}
 */
export const MouseButton = {
  MouseLeft: 1 << 0,
  MouseRight: 1 << 1,
  MouseMiddle: 1 << 2,
  Mouse4: 1 << 3,
  Mouse5: 1 << 4,
}
/**
 * @returns {import('./types/index.js').MouseInfo}
 */
export function mouseInit() {
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
/**
 * Gets the cursor position on the canvas
 * @returns {[x: number, y: number]}
 */
export function cursorPosition() {
  return [Engine[MOUSE].x, Engine[MOUSE].y]
}
/**
 * Gets the cursor position difference from last frame to this one
 * @returns {[x: number, y: number]}
 */
export function cursorDelta() {
  return [
    Engine[MOUSE].x - Engine[MOUSE].prevX,
    Engine[MOUSE].y - Engine[MOUSE].prevY,
  ]
}
/**
 * Checks if the specified mouse button is currently pressed
 * @param {MouseButton} button
 * @returns {boolean}
 */
export function isMouseButtonPressed(button) {
  return isSet(Engine[MOUSE].buttons, button)
}
/**
 * Checks if the specified mouse button was pressed starting this frame
 * @param {MouseButton} button
 * @return {boolean}
 */
export function isMouseButtonJustPressed(button) {
  return (
    isSet(Engine[MOUSE].buttons, button) &&
    !isSet(Engine[MOUSE].prevButtons, button)
  )
}
/**
 * Checks if the specified mouse button was released starting this frame
 * @param {MouseButton} button
 * @returns {boolean}
 */
export function isMouseButtonJustReleased(button) {
  return (
    !isSet(Engine[MOUSE].buttons, button) &&
    isSet(Engine[MOUSE].prevButtons, button)
  )
}
/**
 * Returns the mouse wheel deltas that occurred this frame
 * @returns {[x: number, y: number]}
 */
export function wheel() {
  return [Engine[MOUSE].wheelX, Engine[MOUSE].wheelY]
}
