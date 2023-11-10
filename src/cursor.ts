import { Bounds } from './types/bounds';

export class Cursor {
	#content: Bounds | undefined;
	#captured: boolean = false;

	/**
	 * "Capture" the cursor.
	 * This is useful for preventing multiple different parts
	 * of your code from all handling mouse events when your
	 * intention is to only handle it in one place.
	 * For example: Multiple sprites are layered on top of eachother.
	 * You might want to only handle the click by the sprite that is
	 * on top of the others. The top sprite can "capture" the event
	 * then the other sprites can check if the cursor has already been
	 * captured and ignore the click event.
	 * Note: The `update()` function must be called before any code that
	 * may use this feature, for example at the beginning of your scene's
	 * `update()` function.
	 */
	capture() {
		this.#captured = true;
	}
	/** Checks if the cursor has already been captured this frame */
	captured(): boolean {
		return this.#captured;
	}
	/** Gets the content of the cursor */
	cursorContent(): Bounds | undefined {
		return this.#content;
	}
	/** Sets the cursor content */
	setCursorContent(content: Bounds | undefined) {
		this.#content = content;
	}
	/** Updates the cursor state. This must be called to used the capture feature. */
	cursorUpdate() {
		this.#captured = false;
	}
}