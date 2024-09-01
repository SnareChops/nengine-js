import { cursorPosition } from './mouse.js'
import type { Sprite, Context } from '../types/index.js'

let state = {
  captured: false as boolean,
  cursorDeltaX: 0 as number,
  cursorDeltaY: 0 as number,
  cursorPrevX: 0 as number,
  cursorPrevY: 0 as number,
  cursorContent: void 0 as Sprite | undefined,
}
/**
 * "Capture" the input.
 * This is useful for preventing multiple different parts
 * of your code from all handling input events when your
 * intention is to only handle it in one place.
 * For example: Multiple sprites are layered on top of eachother.
 * You might want to only handle the click by the sprite that is
 * on top of the others. The top sprite can "capture" the event
 * then the other sprites can check if the input has already been
 * captured and ignore the click event.
 * Note: The `update()` function must be called before any code that
 * may use this feature, for example at the beginning of your scene's
 * `update()` function.
 */
export function inputCapture() {
  state.captured = true
}
/** Checks if the input has already been captured */
export function isInputCaptured(): boolean {
  return state.captured
}
/** Gets the cursor content */
export function cursorContent(): Sprite | undefined {
  return state.cursorContent
}
/**
 * Sets the cursor content
 * set to undefined to remove the cursor content
 */
export function setCursorContent(content: Sprite | undefined) {
  state.cursorContent = content
}

export function reset() {
  state = {
    captured: false as boolean,
    cursorDeltaX: 0 as number,
    cursorDeltaY: 0 as number,
    cursorPrevX: 0 as number,
    cursorPrevY: 0 as number,
    cursorContent: void 0 as Sprite | undefined,
  }
}

/** Update the input state */
export function update() {
  state.captured = false
  const [x, y] = cursorPosition()
  state.cursorDeltaX = x - state.cursorPrevX
  state.cursorDeltaY = y - state.cursorPrevY
  state.cursorPrevX = x
  state.cursorPrevY = y
  if (!!state.cursorContent) {
    state.cursorContent.setPos2(x, y)
  }
}
/**
 * Draws the cursor content
 */
export function draw(ctx: Context) {
  if (state.cursorContent) {
    const image = state.cursorContent.image()
    if (image) {
      ctx.drawImage(image, ...state.cursorContent.min())
    }
  }
}

