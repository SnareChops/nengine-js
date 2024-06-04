import { cursorPosition } from '../mouse';
import { Bounds } from '../types/bounds';
import { CameraBounds } from './camera-bounds';

/** BasicCamera represents a basic sliding camera implementation */
export class BasicCamera extends CameraBounds {
    #ww: number = 0;
    #wh: number = 0;
    #zoom: number = 1;
    #target: Bounds | undefined;

    constructor(viewWidth: number, viewHeight: number, worldWidth: number, worldHeight: number) {
        super(viewWidth, viewHeight);
        this.#ww = worldWidth;
        this.#wh = worldHeight;
        this.#zoom = 1;
        this.setPos(0, 0);
    };
    /** Set the position of the camera center */
    setPos(x: number, y: number) {
        super.setPos(x, y);
        const [minX, minY] = this.min();
        const [maxX, maxY] = this.max();
        if (minX < 0) super.setPos(this.x() - minX, this.y());
        if (minY < 0) super.setPos(this.x(), this.y() - minY);
        if (maxX > this.#ww) super.setPos(this.x() - (maxX - this.#ww), this.y());
        if (maxY > this.#wh) super.setPos(this.x(), this.y() - (maxY - this.#wh));
    }
    /** Get the zoom level of the camera */
    zoom(): number {
        return this.#zoom;
    }
    /** Set the zoom level of the camera */
    setZoom(zoom: number) {
        this.#zoom = zoom;
        this.resize(this.dx() / this.#zoom, this.dy() / this.#zoom);
    }
    /** 
     * Follow a target with the camera
     * Note: Requires calling update() to move the camera to the target's position
     */
    follow(target: Bounds) {
        this.#target = target;
    }
    /** Get the size of the camera's viewport */
    viewSize(): [number, number] {
        return this.size();
    }
    /** Get the size of the world */
    worldSize(): [number, number] {
        return [this.#ww, this.#wh];
    }
    /**
     * Get a rectangle of absolute positions in world coordinates of
     * the camera's current viewport
     */
    view(): [number, number, number, number] {
        return [this.minX(), this.minY(), this.maxX(), this.maxY()];
    }
    /** Get the cursor's position in the world */
    cursorWorldPosition(): [number, number] {
        return this.screenToWorldPos(...cursorPosition());
    }
    /** Translate a world coordinate to screen coordinates based on the camera's current position */
    worldToScreenPos(x: number, y: number): [number, number] {
        return [(x - this.minX()) * this.#zoom, (y - this.minY()) * this.#zoom];
    }
    /** Transform a screen coordinate to world coordinates based on the camera's current position */
    screenToWorldPos(screenX: number, screenY: number): [number, number] {
        return [this.minX() + screenX / this.#zoom, this.minY() + screenY / this.#zoom];
    }
    /** Updates the state of the camera */
    update() {
        if (!!this.#target) this.setPos(...this.#target.xy());
    }
}