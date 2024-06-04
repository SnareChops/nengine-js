
export class CameraBounds {
    #x: number = 0;
    #y: number = 0;
    #w: number = 0;
    #h: number = 0;
    #ox: number = 0;
    #oy: number = 0;

    constructor(width: number, height: number) {
        this.#w = Math.floor(width);
        this.#h = Math.floor(height);
        this.#ox = this.#w / 2;
        this.#oy = this.#h / 2;
    }

    pos(): [number, number] {
        return [this.#x, this.#y];
    }

    setPos(x: number, y: number) {
        this.#x = x;
        this.#y = y;
    }

    size(): [number, number] {
        return [this.#w, this.#h];
    }

    resize(w: number, h: number) {
        w = Math.floor(w);
        h = Math.floor(h);
        this.#ox = this.#ox * (w / this.#w);
        this.#oy = this.#oy * (h / this.#h);
        this.#w = w;
        this.#h = h;
    }

    width(): number {
        return this.#w;
    }

    height(): number {
        return this.#h;
    }

    dx(): number {
        return this.#w;
    }

    dy(): number {
        return this.#h;
    }

    min(): [number, number] {
        return [this.#x - this.#ox, this.#y - this.#oy];
    }

    max(): [number, number] {
        return [this.#x - this.#ox + this.#w, this.#y - this.#oy + this.#h];
    }

    x(x?: number): number {
        if (!!x) this.#x = x;
        return this.#x;
    }

    y(y?: number): number {
        if (!!y) this.#y = y;
        return this.#y;
    }

    minX(): number {
        return this.#x - this.#ox;
    }

    minY(): number {
        return this.#y - this.#oy;
    }

    maxX(): number {
        return this.#x - this.#ox + this.#w;
    }

    maxY(): number {
        return this.#y - this.#oy + this.#h;
    }

    isWithin(x: number, y: number): boolean {
        const [x1, y1] = this.min();
        const [x2, y2] = this.max();
        return x >= x1 && x <= x2 && y >= y1 && y <= y2;
    }
}