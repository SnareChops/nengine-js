import { cursorPosition } from '..';
import { Context, Image } from '../image';
import { Entity } from '../types/entity';
import { createCanvas } from '../util';
import { clamp } from '../utils';

/** Camera represents a virtual camera for use by the Renderer */
export class Camera {
	#x: number = 0;
	#y: number = 0;
	#vw: number = 0;
	#vh: number = 0;
	#ww: number = 0;
	#wh: number = 0;
	#rect: [x: number, y: number, w: number, h: number] = [0, 0, 0, 0];
	#zoom: number = 1;
	#canvas: Image;
	#context: Context;
	#target: Entity | undefined;

	constructor(viewWidth: number, viewHeight: number, worldWidth: number, worldHeight: number) {
		this.#zoom = 1;
		this.#vw = viewWidth;
		this.#vh = viewHeight;
		this.#ww = worldWidth;
		this.#wh = worldHeight;
		[this.#canvas, this.#context] = createCanvas(viewWidth, viewHeight);
		this.setCameraPos(0, 0);
	}
	/** Gets the position of the camera */
	cameraPos(): [number, number] {
		return [this.#x, this.#y];
	}
	/** Sets the position of the Camera */
	setCameraPos(x: number, y: number) {
		this.#x, this.#y = x, y;
		this.#resize();
	}
	/** Returns the view size of the Camera */
	cameraViewSize(): [width: number, height: number] {
		return [this.#vw, this.#vh];
	}
	/** Returns a rectangle representing the current view of the Camera */
	cameraView(): [x: number, y: number, w: number, h: number] {
		return this.#rect;
	}
	/** Gets the zoom level of the camera */
	cameraZoom(): number {
		return this.#zoom;
	}
	/** Sets the zoom level of the camera */
	setCameraZoom(zoom: number) {
		if (zoom <= 0) return console.log("Attempted to set camera zoom to an invalid number:", zoom);
		this.#zoom = zoom;
		this.#resize();
	}
	/** Returns the image visible within the camera */
	cameraImage(source: Image): Image {
		this.#context.reset();
		this.#context.drawImage(source, ...this.cameraView(), 0, 0, this.#vw * this.#zoom, this.#vh * this.#zoom);
		return this.#canvas;
	}
	/** Gets the cursors position in the world */
	cursorWorldPosition(): [number, number] {
		return this.screenToWorldPos(...cursorPosition());
	}
	/**
	 * Converts the provided world coordinates to screen coordinates
	 * based on the current view of the Camera
	 */
	worldToScreenPos(x: number, y: number): [number, number] {
		return [x - this.#rect[0], y - this.#rect[1]];
	}
	/** 
	 * Converts the provided screen coordinates to world coordinates
	 * based on the current view of the Camera
	 */
	screenToWorldPos(screenX: number, screenY: number): [number, number] {
		return [this.#rect[0] + screenX / this.#zoom, this.#rect[1] + screenY / this.#zoom];
	}

	update(delta: number) {
		if (!!this.#target) {
			const [x, y] = this.worldToScreenPos(...this.#target.xy());
			this.setCameraPos(x, y);
		}
	}

	#resize() {
		// Calculate width and height of SubImage box
		// factoring in zoom level
		const zw = this.#vw / this.#zoom;
		const zh = this.#vh / this.#zoom;
		// Calculae the points for the rectangle
		const x1 = clamp(this.#x - zw / 2, 0, this.#ww - zw);
		const y1 = clamp(this.#y - zh / 2, 0, this.#wh - zh);
		const x2 = clamp(x1 + zw, zw, this.#ww);
		const y2 = clamp(y1 + zh, zh, this.#wh);
		this.#rect = [x1, y1, x2 - x1, y2 - y1];
	}
}