import { normalVector, normalizeVector } from './trig';

export const TOP = 0;
export const CENTER = 1;
export const BOTTOM = 2;
export const LEFT = 3;
export const RIGHT = 4;

export interface Bounds {
    vec2(): [number, number];
    setVec2(x: number, y: number);
    vec3(): [number, number, number];
    setVec3(x: number, y: number, z: number);
    rawPos(): [number, number];
    anchor(): [number, number];
    setAnchor(x: number, y: number);
    vecOf(h: number, v: number): [number, number];
    offset(): [number, number];
    size(): [number, number];
    setSize(w: number, h: number);
    rotation(): number;
    setRotation(theta: number);
    scale(): number;
    setScale(scale: number);
    scaleTo(w: number, h: number);
    width(): number;
    height(): number;
    isWithin(x: number, y: number): boolean;
    normalVectorOf(edge: number): [number, number];
}

export abstract class BaseBounds {
    #x: number = 0;
    #y: number = 0;
    #z: number = 0;
    #offsetX: number = 0;
    #offsetY: number = 0;
    #anchorX: number = 0;
    #anchorY: number = 0;
    #width: number = 0;
    #height: number = 0;
    #rotation: number = 0;
    #scale: number = 1;

    constructor(width: number, height: number) {
        this.#width = width;
        this.#height = height;
    }

    vec2(): [number, number] {
        return [this.#x, this.#y];
    }

    setVec2(x: number, y: number) {
        this.#x = x;
        this.#y = y;
    }

    vec3(): [number, number, number] {
        return [this.#x, this.#y, this.#z];
    }

    setVec3(x: number, y: number, z: number) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    rawPos(): [number, number] {
        return [this.#x - this.#offsetX, this.#y - this.#offsetY];
    }

    setAnchor(x: number, y: number) {
        this.#anchorX = x;
        this.#anchorY = y;
        switch (x) {
            case LEFT:
                this.#offsetX = 0;
                break;
            case CENTER:
                this.#offsetX = this.#width / 2;
                break;
            case RIGHT:
                this.#offsetX = this.#width;
                break;
        }
        switch (y) {
            case TOP:
                this.#offsetY = 0;
                break;
            case CENTER:
                this.#offsetY = this.#height / 2;
                break;
            case BOTTOM:
                this.#offsetY = this.#height;
                break;
        }
    }

    vecOf(h: number, v: number): [number, number] {
        let x = 0;
        let y = 0;
        switch (h) {
            case LEFT:
                x = this.#x - (this.#offsetX * this.#scale);
                break;
            case CENTER:
                x = this.#x - (this.#offsetX * this.#scale) + (this.width() / 2);
                break;
            case RIGHT:
                x = this.#x - this.#offsetX * this.#scale + this.width();
                break;
        }
        switch (v) {
            case TOP:
                y = this.#y - this.#offsetY * this.#scale;
                break;
            case CENTER:
                y = this.#y - (this.#offsetY * this.#scale) + (this.height() / 2);
                break;
            case BOTTOM:
                y = this.#y - this.#offsetY * this.#scale + this.height();
                break;
        }
        return [x, y];
    }

    anchor(): [number, number] {
        return [this.#anchorX, this.#anchorY];
    }

    offset(): [number, number] {
        return [this.#offsetX * this.#scale, this.#offsetY * this.#scale];
    }

    size(): [number, number] {
        return [this.width(), this.height()];
    }

    // TODO: make sure this makes sense with a scaled object
    setSize(w: number, h: number) {
        this.#width = w;
        this.#height = h;
    }

    width(): number {
        return this.#width * this.#scale;
    }

    height(): number {
        return this.#height * this.#scale;
    }

    rotation(): number {
        return this.#rotation;
    }

    setRotation(theta: number) {
        this.#rotation = theta;
    }

    scale(): number {
        return this.#scale;
    }

    setScale(scale: number) {
        this.#scale = scale;
    }

    // TODO: What happens if you try to scale an already scaled image
    scaleTo(width: number, height: number) {
        const widthFactor = width / this.#width;
        const heightFactor = height / this.#height;
        this.#scale = Math.min(widthFactor, heightFactor);
    }

    normalVectorOf(edge: number): [number, number] {
        switch (edge) {
            case LEFT:
                return [-1, 0]
            case TOP:
                return [0, -1]
            case RIGHT:
                return [1, 0]
            case BOTTOM:
                return [0, 1]
            default:
                throw new Error('Invalid edge');
        }
    }

    isWithin(x: number, y: number): boolean {
        const [x1, y1] = this.rawPos();
        if (this.width() == 1 && this.height() == 1) {
            return x == x1 && y == y1;
        }
        const x2 = x1 + this.width();
        const y2 = y1 + this.height();
        return x > x1 && x < x2 && y > y1 && y < y2;
    }

    doesCollide(other: Bounds): boolean {
        const [w1, h1] = this.size();
        const [x1, y1] = this.rawPos();
        const [w2, h2] = other.size();
        const [x2, y2] = other.rawPos();
        return !(x2 + w2 < x1 || x2 > x1 + w1 || y2 + h2 < y1 || y2 > y1 + h1);
    }

    collisionEdges(other: Bounds): [number, number] {
        const [w1, h1] = this.size();
        const [x1, y1] = this.rawPos();
        const [w2, h2] = other.size();
        const [x2, y2] = other.rawPos();

        if (x1 + w1 >= x2 && x1 < x2) {
            return [LEFT, RIGHT];
        }
        if (x1 <= x2 + w2 && x1 + w1 > x2 + w2) {
            return [RIGHT, LEFT];
        }
        if (y1 + h1 >= y2 && y1 < y2) {
            return [TOP, BOTTOM];
        }
        if (y1 <= y2 + h2 && y1 + h1 > y2 + h2) {
            return [BOTTOM, TOP];
        }
        return [0, 0];
    }
}

export class RawBounds extends BaseBounds {
    constructor(width: number = 0, height: number = 0) {
        super(width, height);
    }
}

export class PhysicsBounds extends BaseBounds {
    #vx: number = 0;
    #vy: number = 0;
    #ax: number = 0;
    #ay: number = 0;

    constructor(width: number = 0, height: number = 0) {
        super(width, height);
    }

    velocity(): [number, number] {
        return [this.#vx, this.#vy];
    }

    setRawVelocity(x: number, y: number) {
        this.#vx = x;
        this.#vy = y;
    }

    setVelocity(angle: number, magnitude: number) {
        this.#vx = Math.cos(angle) * magnitude;
        this.#vy = Math.sin(angle) * magnitude;
    }

    acceleration(): [number, number] {
        return [this.#ax, this.#ay];
    }

    setAcceration(angle: number, magnitude: number) {
        this.#ax = Math.cos(angle) * magnitude;
        this.#ay = Math.sin(angle) * magnitude;
    }

    update(delta: number) {
        this.#vx += this.#ax * delta;
        this.#vy += this.#ay * delta;
        const [x, y] = this.vec2();
        this.setVec2(x + this.#vx * delta, y + this.#vy * delta);
    }
}