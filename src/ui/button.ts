import { isSet } from '../bit';
import { RawBounds } from '../bounds';
import { MouseButton, isMouseButtonPressed } from '../mouse';

export enum ButtonState {
    None = 0,
    Hovered = 1 << 1,
    Clicked = 1 << 2,
    JustHovered = 1 << 3,
    JustClicked = 1 << 4,
    Disabled = 1 << 5,
}

/**
 * Base class for creating buttons.
 * This handles useful state for buttons, but does not include a visual component.
 * Extend this class and add a visual component to create a visible button.
 */
export class Button extends RawBounds {
    #state: ButtonState = 0;
    /** Gets the current button state */
    state(): ButtonState {
        return this.#state;
    }
    /** Checks if the button is in the provided state */
    is(state: ButtonState): boolean {
        return isSet(this.#state, state);
    }
    /** Disables the button */
    disable() {
        this.#state |= ButtonState.Disabled;
    }
    /** Enables the button */
    enable() {
        this.#state &= ~ButtonState.Disabled;
    }
    /** 
     * Update the button state 
     * Unlike most update() functions, this one requires the cursor's
     * position to be passed to it. This is because depending on how
     * the button has been positioned in the scene, it may use absolute
     * or relative coordinates.
     */
    update(x: number, y: number): boolean {
        const prev = this.#state;
        this.#state = 0;
        if (this.isWithin(x, y)) {
            this.#state |= ButtonState.Hovered;
            if (!isSet(prev, ButtonState.Hovered)) {
                this.#state |= ButtonState.JustHovered;
            }
            if (isMouseButtonPressed(MouseButton.MouseLeft)) {
                this.#state |= ButtonState.Clicked;
                if (!isSet(prev, ButtonState.Clicked)) {
                    this.#state |= ButtonState.JustClicked;
                }
            }
        }
        return prev != this.#state;
    }
}