import { Bounds, cursorPosition } from '..';
import { CameraBounds } from './camera-bounds';

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

    setPos(x: number, y: number) {
        super.setPos(x, y);
        const [minX, minY] = this.min();
        const [maxX, maxY] = this.max();
        if (minX < 0) this.setPos(this.x() + (0 - minX), this.y());
        if (minY < 0) this.setPos(this.x(), this.y() + (0 - minY));
        if (maxX > this.#ww) this.setPos(this.x() - (maxX - this.#ww), this.y() - (maxY - this.#wh));
        if (maxY > this.#wh) this.setPos(this.x(), this.y() - (maxY - this.#wh));
    }

    zoom(): number {
        return this.#zoom;
    }

    setZoom(zoom: number) {
        this.#zoom = zoom;
        this.resize(this.dx() / this.#zoom, this.dy() / this.#zoom);
    }

    follow(target: Bounds) {
        this.#target = target;
    }

    viewSize(): [number, number] {
        return this.size();
    }

    worldSize(): [number, number] {
        return [this.#ww, this.#wh];
    }

    view(): [number, number, number, number] {
        return [this.minX(), this.minY(), this.maxX(), this.maxY()];
    }

    cursorWorldPosition(): [number, number] {
        return this.screenToWorldPos(...cursorPosition());
    }

    worldToScreenPos(x: number, y: number): [number, number] {
        return [(x - this.minX()) * this.#zoom, (y - this.minY()) * this.#zoom];
    }

    screenToWorldPos(screenX: number, screenY: number): [number, number] {
        return [this.minX() + screenX / this.#zoom, this.minY() + screenY / this.#zoom];
    }

    update() {
        if (!!this.#target) this.setPos(...this.#target.xy());
    }
}