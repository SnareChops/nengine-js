import { createCanvas } from './util';
import { clamp } from './trig';

// Camera represents a virtual camera for use by the Renderer
export class Camera {
	#x: number = 0;
	#y: number = 0;
	#vw: number = 0;
	#vh: number = 0;
	#ww: number = 0;
	#wh: number = 0;
	#rect: [x: number, y: number, w: number, h: number];
	#zoom: number = 1;
	#canvas: HTMLCanvasElement;
	#context: CanvasRenderingContext2D;

	constructor(viewWidth: number, viewHeight: number, worldWidth: number, worldHeight: number) {
		this.#zoom = 1;
		this.#vw = viewWidth;
		this.#vh = viewHeight;
		this.#ww = worldWidth;
		this.#wh = worldHeight;
		[this.#canvas, this.#context] = createCanvas(viewWidth, viewHeight);
		this.setPos(0, 0);
	}

	pos(): [number, number] {
		return [this.#x, this.#y];
	}

	/** Set the position of the Camera */
	setPos(x: number, y: number) {
		this.#x, this.#y = x, y;
		this.resize();
	}

	resize() {
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

	/** viewSize returns the view size of the Camera (width, height int) */
	viewSize(): [number, number] {
		return [this.#vw, this.#vh];
	}

	/** view returns a rectangle representing the current view of the Camera 
	 * returns [x, y, w, h]
	*/
	view(): [x: number, y: number, w: number, h: number] {
		return this.#rect;
	}

	zoom(): number {
		return this.#zoom;
	}

	setZoom(zoom: number) {
		if (zoom <= 0) {
			console.log("Attempted to set camera zoom to an invalid number:", zoom);
			return
		}
		this.#zoom = zoom;
		this.resize()
	}

	image(source: CanvasImageSource): CanvasImageSource {
		this.#context.reset();
		// this.options.GeoM.Scale(self.zoom, self.zoom)
		this.#context.drawImage(source, ...this.view(), 0, 0, this.#vw, this.#vh);
		return this.#canvas;
	}

	// WorldToScreenPos converts the provided world coordinates to screen coordinates
	// based on the current view of the Camera
	worldToScreenPos(x: number, y: number): [number, number] {
		return [x - this.#rect[0], y - this.#rect[1]];
	}

	// ScreenToWorldPos converts the provided screen coordinates to world coordinates
	// based on the current view of the Camera
	screenToWorldPos(screenX: number, screenY: number): [number, number] {
		return [this.#rect[0] + screenX / this.#zoom, this.#rect[1] + screenY / this.#zoom];
	}
}