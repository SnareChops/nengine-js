export const TOP = 0;
export const CENTER = 1;
export const BOTTOM = 2;
export const LEFT = 3;
export const RIGHT = 4;

export interface Bounds {
    vec2(): [x: number, y: number];
    setVec2(x: number, y: number);
    vec3(): [x: number, y: number, z: number];
    setVec3(x: number, y: number, z: number);
    rawPos(): [x: number, y: number];
    offset(): [x: number, y: number];
    setOffset(x: number, y: number);
    setAnchor(x: number, y: number);
    vecOf(h: number, v: number): [x: number, y: number];
    size(): [width: number, height: number];
    setSize(w: number, h: number);
    rotation(): number;
    setRotation(theta: number);
    scale(): number;
    setScale(scale: number);
    scaleTo(w: number, h: number): [width: number, height: number];
    width(): number;
    height(): number;
    isWithin(x: number, y: number): boolean;
    normalVectorOf(edge: number): [x: number, y: number];
}

export abstract class BaseBounds {
    #x: number = 0;
    #y: number = 0;
    #z: number = 0;
    #offsetX: number = 0;
    #offsetY: number = 0;
    #width: number = 0;
    #height: number = 0;
    #rotation: number = 0;
    #scale: number = 1;

    constructor(width: number, height: number) {
        this.#width = width;
        this.#height = height;
    }

    /** Gets the current position of the bounds */
    vec2(): [x: number, y: number] {
        return [this.#x, this.#y];
    }

    /** Set the current position of the bounds */
    setVec2(x: number, y: number) {
        this.#x = x;
        this.#y = y;
    }

    /** Get the current position and z-index of the bounds */
    vec3(): [x: number, y: number, z: number] {
        return [this.#x, this.#y, this.#z];
    }

    /** Sets the current position and z-index of the bounds */
    setVec3(x: number, y: number, z: number) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    /** Gets the position of the top-left corner of the bounds */
    rawPos(): [x: number, y: number] {
        return [this.#x - this.#offsetX, this.#y - this.#offsetY];
    }

    /** Gets the relative offset of the position within the bounds */
    offset(): [x: number, y: number] {
        return [this.#offsetX * this.#scale, this.#offsetY * this.#scale];
    }

    /** Sets the raw offset value for the bounds positioning */
    setOffset(x: number, y: number) {
        this.#offsetX = x;
        this.#offsetY = y;
    }

    /** Sets the anchor point (internally the offset) for the bounds positioning */
    setAnchor(x: number, y: number) {
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

    /** Return the actual absolute position of the specified anchor point */
    vecOf(h: number, v: number): [x: number, y: number] {
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


    /** Get the width and height of the bounds */
    size(): [width: number, height: number] {
        return [this.width(), this.height()];
    }

    /** Set the size (width, height) of the bounds */
    setSize(w: number, h: number) {
        this.#width = w / this.#scale;
        this.#height = h / this.#scale;
    }

    /** Get the width of the bounds */
    width(): number {
        return this.#width * this.#scale;
    }

    /** Get the height of the bounds */
    height(): number {
        return this.#height * this.#scale;
    }

    /** Get the rotation of the bounds (in radians) */
    rotation(): number {
        return this.#rotation;
    }

    /** Set the rotation of the bounds (in radians) */
    setRotation(theta: number) {
        this.#rotation = theta;
    }

    /** Get the scale of the bounds */
    scale(): number {
        return this.#scale;
    }

    /** Set the scale of the bounds */
    setScale(scale: number) {
        this.#scale = scale;
        // this.#offsetX *= scale
        // this.#offsetY *= scale
    }

    /** Scale the bounds to fit within the specified dementions 
     *  Returns the actual size after scaling
     */
    scaleTo(width: number, height: number): [width: number, height: number] {
        const widthFactor = width / this.#width;
        const heightFactor = height / this.#height;
        this.#scale = Math.min(widthFactor, heightFactor);
        return this.size();
    }

    /** Get the normal vector of the specified edge */
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

    /** Check if the provided absolute coordinate is within the bounds */
    isWithin(x: number, y: number): boolean {
        const [x1, y1] = this.rawPos();
        if (this.width() == 1 && this.height() == 1) {
            return x == x1 && y == y1;
        }
        const x2 = x1 + this.width();
        const y2 = y1 + this.height();
        return x > x1 && x < x2 && y > y1 && y < y2;
    }

    /** Check if this bounds collides with another */
    doesCollide(other: Bounds): boolean {
        const [w1, h1] = this.size();
        const [x1, y1] = this.rawPos();
        const [w2, h2] = other.size();
        const [x2, y2] = other.rawPos();
        return !(x2 + w2 < x1 || x2 > x1 + w1 || y2 + h2 < y1 || y2 > y1 + h1);
    }

    /** Get the edges involved in a collision */
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

    /** Gets the horizontal and vertical velocity of the bounds */
    velocity(): [h: number, v: number] {
        return [this.#vx, this.#vy];
    }

    /** Sets the horizontal and vertical velocity of the bounds */
    setRawVelocity(x: number, y: number) {
        this.#vx = x;
        this.#vy = y;
    }

    /** Sets the angle and magnitude of the bounds velocity */
    setVelocity(angle: number, magnitude: number) {
        this.#vx = Math.cos(angle) * magnitude;
        this.#vy = Math.sin(angle) * magnitude;
    }

    /** Gets the acceration of the bounds */
    acceleration(): [x: number, y: number] {
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