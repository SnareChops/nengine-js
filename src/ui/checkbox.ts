import { bitmaskAdd, bitmaskRemove, isSet } from '../bit/index.js'
import { RawBounds } from '../bounds/index.js'
import { MouseButton, isMouseButtonJustPressed } from '../input/index.js'
import { isWithin } from '../utils/index.js'

export enum CheckboxState {
  Checked = 1 << 0,
  JustChanged = 1 << 1,
  Hovered = 1 << 2,
}

export class Checkbox extends RawBounds {
  #state: CheckboxState = 0 as CheckboxState

  is(state: CheckboxState): boolean {
    return isSet(this.#state, state)
  }

  setChecked(checked: boolean) {
    if (checked) {
      this.#state = bitmaskAdd(this.#state, CheckboxState.Checked)
    } else {
      this.#state = bitmaskRemove(this.#state, CheckboxState.Checked)
    }
  }

  update(x: number, y: number): boolean {
    const prev = this.#state
    this.#state = bitmaskRemove(this.#state, CheckboxState.JustChanged)
    if (isWithin(this, x, y)) {
      this.#state = bitmaskAdd(this.#state, CheckboxState.Hovered)
      if (isMouseButtonJustPressed(MouseButton.Left)) {
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
