export class Vector {
  x: number = 0
  y: number = 0

  static fromAngle(angle: number, magnitude: number): Vector {
    return new Vector(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude)
  }

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y)
  }

  sub(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y)
  }

  normalize(): Vector {
    const magnitude = Math.sqrt(this.x * this.x + this.y * this.y)
    if (magnitude === 0) return this
    return new Vector(this.x / magnitude, this.y / magnitude)
  }

  scale(scale: number): Vector {
    return new Vector(this.x * scale, this.y * scale)
  }

  distance(v: Vector): number {
    const diff = this.sub(v)
    return Math.sqrt(diff.x * diff.x + diff.y * diff.y)
  }
}
