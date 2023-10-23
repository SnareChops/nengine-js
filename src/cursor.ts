import { cursorDelta, cursorPosition, isMouseButtonJustPressed, isMouseButtonJustReleased, isMouseButtonPressed, wheel, MouseButton } from './mouse';

export class Cursor {
	#captured: boolean = false;

	/** @deprecated use cursorPosition() from nengine root instead */
	screenPos(): [number, number] {
		return cursorPosition();
	}

	/** @deprecated use cursorDelta() from nengine root instead */
	deltaScreenPos(): [number, number] {
		return cursorDelta();
	}
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
	/** @deprecated use isMouseButtonPressed from nengine root instead */
	isMouseButtonPressed(button: MouseButton): boolean {
		return isMouseButtonPressed(button);
	}
	/** @deprecated use isMouseButtonJustPressed from nengine root instead */
	isMouseButtonJustPressed(button: MouseButton): boolean {
		return isMouseButtonJustPressed(button);
	}
	/** @deprecated use isMouseButtonJustReleased() from nengine root instead */
	isMouseButtonJustReleased(button: MouseButton): boolean {
		return isMouseButtonJustReleased(button);
	}
	/** @deprecated use wheel() from nengine root instead */
	wheel(): [x: number, y: number] {
		return wheel();
	}
	/** Updates the cursor state. This must be called to used the capture feature. */
	update() {
		this.#captured = false;
	}
}