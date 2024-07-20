import { bitmaskAdd, bitmaskRemove, isSet } from '../bit/index.js'
import { RawBounds } from '../bounds/index.js'
import { MouseButton, isMouseButtonJustPressed } from '../mouse.js'
import { isWithin } from '../utils/index.js'

/**
 * @readonly
 * @enum {number}
 */
export const CheckboxState = {
  Checked: 1 << 0,
  JustChanged: 1 << 1,
  Hovered: 1 << 2,
}

export class Checkbox extends RawBounds {
  /** @type {CheckboxState} */
  #state = 0
  /**
   * @param {CheckboxState} state
   * @returns {boolean}
   */
  is(state) {
    return isSet(this.#state, state)
  }
  /**
   * @param {boolean} checked
   */
  setChecked(checked) {
    if (checked) {
      this.#state = bitmaskAdd(this.#state, CheckboxState.Checked)
    } else {
      this.#state = bitmaskRemove(this.#state, CheckboxState.Checked)
    }
  }
  /**
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  update(x, y) {
    const prev = this.#state
    this.#state = bitmaskRemove(this.#state, CheckboxState.JustChanged)
    if (isWithin(this, x, y)) {
      this.#state = bitmaskAdd(this.#state, CheckboxState.Hovered)
      if (isMouseButtonJustPressed(MouseButton.MouseLeft)) {
        this.#state = bitmaskAdd(this.#state, CheckboxState.JustChanged)
        if (isSet(this.#state, CheckboxState.Checked)) {
          this.#state = bitmaskRemove(this.#state, CheckboxState.Checked)
        } else {
          this.#state = bitmaskAdd(this.#state, CheckboxState.Checked)
        }
      }
    }
    return prev !== this.#state
  }
}
