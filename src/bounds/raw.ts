import { Point } from './position';
import { LEFT, RIGHT, CENTER, TOP, BOTTOM, Bounds } from './bounds';

export class Raw extends Point {
    #offsetX: number = 0;
    #offsetY: number = 0;
    #width: number = 0;
    #height: number = 0;
    #rotation: number = 0;
    #scale: number = 1;

    constructor(width: number = 0, height: number = 0) {
        super();
        this.#width = width;
        this.#height = height;
    }

    /** @deprecated use posOf() instead */
    vecOf = this.posOf;
    /**
     * Gets the absolute x,y position of the provided anchor point
     * horizontal: {@link LEFT}, {@link RIGHT}, {@link CENTER}
     * vertical: {@link TOP}, {@link BOTTOM}, {@link CENTER}
    */
    posOf(h: number, v: number): [x: number, y: number] {
        let x = 0;
        let y = 0;
        switch (h) {
            case LEFT:
                x = this.X - (this.#offsetX * this.#scale);
                break;
            case CENTER:
                x = this.X - (this.#offsetX * this.#scale) + (this.#width / 2);
                break;
            case RIGHT:
                x = this.X - this.#offsetX * this.#scale + this.#width;
                break;
        }
        switch (v) {
            case TOP:
                y = this.Y - this.#offsetY * this.#scale;
                break;
            case CENTER:
                y = this.Y - (this.#offsetY * this.#scale) + (this.#height / 2);
                break;
            case BOTTOM:
                y = this.Y - this.#offsetY * this.#scale + this.#height;
                break;
        }
        return [x, y];
    }
    /** Gets the absolute x,y position of the top left corner of the bounds */
    rawPos(): [x: number, y: number] {
        return [this.X - this.#offsetX, this.Y - this.#offsetY];
    }
    /**
     * Sets the horizontal and vertical anchor setting for the bounds 
     * horizontal: {@link LEFT}, {@link RIGHT}, or {@link CENTER}
     * vertical: {@link TOP}, {@link BOTTOM}, or {@link CENTER}
     */
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
    /** Gets the relative x,y offset of the bounds */
    offset(): [x: number, y: number] {
        return [this.#offsetX * this.#scale, this.#offsetY * this.#scale];
    }
    /** Sets the relative x,y offset of the bounds */
    setOffset(x: number, y: number) {
        this.#offsetX = x;
        this.#offsetY = y;
    }
    /** Gets the width,height of the bounds */
    size(): [width: number, height: number] {
        return [this.width(), this.height()];
    }
    /** Sets the width,height of the bounds */
    setSize(w: number, h: number) {
        this.#width = w / this.#scale;
        this.#height = h / this.#scale;
    }
    /**
     * Gets the width of the bounds 
     * @alias dx
     */
    width(): number {
        return this.#width * this.#scale;
    }
    /**
     * Gets the height of the bounds
     * @alias dy 
     */
    height(): number {
        return this.#height * this.#scale;
    }
    /** Gets the width of the bounds */
    dx(): number {
        return this.#width * this.#scale;
    }
    /** Gets the height of the bounds */
    dy(): number {
        return this.#height * this.#scale;
    };
    /** Gets the rotation of the bounds (in radians) */
    rotation(): number {
        return this.#rotation;
    }
    /** Sets the rotation of the bounds (in radians) */
    setRotation(radians: number) {
        this.#rotation = radians;
    }
    /** Gets the scale of the bounds, as float percentage */
    scale(): number {
        return this.#scale;
    }
    /** Sets the scale of the bounds, as float percentage */
    setScale(scale: number) {
        this.#scale = scale;
    }
    /**
     * Scales the bounds to fit within the provided width,height
     * returns the actual width,height after scaling
     */
    scaleTo(width: number, height: number): [width: number, height: number] {
        const widthFactor = width / this.#width;
        const heightFactor = height / this.#height;
        this.#scale = Math.min(widthFactor, heightFactor);
        return this.size();
    }
    /** Gets the minmum absolute x,y position of the bounds */
    min(): [x: number, y: number] {
        return this.rawPos()
    }
    /** Gets the absolute x,y position at the midpoint of the bounds */
    mid(): [x: number, y: number] {
        return [Math.floor(this.X + this.#width / 2), Math.floor(this.Y + this.#height / 2)];
    }
    /** Gets the maximum absolute x,y position of the bounds */
    max(): [x: number, y: number] {
        return [this.X + this.#width, this.Y + this.#height];
    }
    /** Checks if the provided x,y position is within the bounds */
    isWithin(x: number, y: number): boolean {
        const [x1, y1] = this.rawPos();
        if (this.width() == 1 && this.height() == 1) {
            return x == x1 && y == y1;
        }
        const x2 = x1 + this.width();
        const y2 = y1 + this.height();
        return x > x1 && x < x2 && y > y1 && y < y2;
    }
    /**
     * Gets the normal vector of the provided edge
     * edges: {@link LEFT}, {@link TOP}, {@link RIGHT}, {@link BOTTOM}
     */
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
    /** Checks if the provided bounds overlaps (touches) this bounds */
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