
export class Vector {
    X: number = 0;
    Y: number = 0;

    static fromAngle(angle: number, magnitude: number): Vector {
        return new Vector(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude);
    }

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }

    add(v: Vector): Vector {
        return new Vector(this.X + v.X, this.Y + v.Y);
    }

    sub(v: Vector): Vector {
        return new Vector(this.X - v.X, this.Y - v.Y);
    }

    normalize(): Vector {
        const magnitude = Math.sqrt(this.X * this.X + this.Y * this.Y);
        if (magnitude === 0) return this;
        return new Vector(this.X / magnitude, this.Y / magnitude);
    }

    scale(scale: number): Vector {
        return new Vector(this.X * scale, this.Y * scale);
    }

    distance(v: Vector): number {
        const diff = this.sub(v);
        return Math.sqrt(diff.X * diff.X + diff.Y * diff.Y);
    }
}