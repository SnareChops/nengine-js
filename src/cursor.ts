import { isSet } from './util';

export enum MouseButton {
	MouseLeft = 1 << 1,
	MouseRight = 1 << 2,
	MouseMiddle = 1 << 3,
	Mouse4 = 1 << 4,
	Mouse5 = 1 << 5,
}

export class Cursor {
	#rawButtons: number = 0;
	#buttons: number = 0;
	#prevButtons: number = 0;
	#x: number = 0;
	#y: number = 0;
	#captured: boolean = false;
	#prevScreenX: number = 0;
	#prevScreenY: number = 0;
	#deltaScreenX: number = 0;
	#deltaScreenY: number = 0;
	#rawDeltaWheelX: number = 0;
	#rawDeltaWheelY: number = 0;
	#deltaWheelX: number = 0;
	#deltaWheelY: number = 0;

	constructor(canvas: HTMLCanvasElement) {
		canvas.addEventListener('mousemove', event => {
			const rect = canvas.getBoundingClientRect();
			this.#x = event.clientX - rect.left;
			this.#y = event.clientY - rect.top;
		}, false);
		canvas.addEventListener('mousedown', event => this.#rawButtons = event.buttons);
		canvas.addEventListener('mouseup', event => this.#rawButtons = event.buttons);
		canvas.addEventListener('wheel', event => {
			this.#rawDeltaWheelX += event.deltaX;
			this.#rawDeltaWheelY += event.deltaY;
		});
	}

	update() {
		this.#captured = false;
		this.#prevButtons = this.#buttons;
		this.#buttons = this.#rawButtons;
		this.#deltaScreenX = this.#x - this.#prevScreenX;
		this.#deltaScreenY = this.#y - this.#prevScreenY;
		this.#prevScreenX = this.#x;
		this.#prevScreenY = this.#y;
		this.#deltaWheelX = this.#rawDeltaWheelX;
		this.#deltaWheelY = this.#rawDeltaWheelY;
		this.#rawDeltaWheelX = 0;
		this.#rawDeltaWheelY = 0;
	}

	screenPos(): [number, number] {
		return [this.#x, this.#y];
	}

	// DeltaScreenPos returns the difference in screen
	// cursor position from the previous frame
	// Note: Update() must be called for this to function
	// correctly
	deltaScreenPos(): [number, number] {
		return [this.#deltaScreenX, this.#deltaScreenY];
	}

	capture() {
		this.#captured = true;
	}

	captured(): boolean {
		return this.#captured;
	}

	isMouseButtonPressed(button: MouseButton): boolean {
		return isSet(this.#buttons, button);
	}

	isMouseButtonJustPressed(button: MouseButton): boolean {
		return !isSet(this.#prevButtons, button) && isSet(this.#buttons, button);
	}

	isMouseButtonJustReleased(button: MouseButton): boolean {
		return isSet(this.#prevButtons, button) && !isSet(this.#buttons, button);
	}

	wheel(): [x: number, y: number] {
		return [this.#deltaWheelX, this.#deltaWheelY];
	}

}