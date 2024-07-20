export class Vector {
  /** @type {number} */
  x = 0
  /** @type {number} */
  y = 0
  /**
   * @param {number} angle
   * @param {number} magnitude
   * @returns {Vector}
   */
  static fromAngle(angle, magnitude) {
    return new Vector(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude)
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  /**
   * @param {Vector} v
   * @returns {Vector}
   */
  add(v) {
    return new Vector(this.x + v.x, this.y + v.y)
  }
  /**
   * @param {Vector} v
   * @returns {Vector}
   */
  sub(v) {
    return new Vector(this.x - v.x, this.y - v.y)
  }
  /**
   * @returns {Vector}
   */
  normalize() {
    const magnitude = Math.sqrt(this.x * this.x + this.y * this.y)
    if (magnitude === 0) return this
    return new Vector(this.x / magnitude, this.y / magnitude)
  }
  /**
   * @param {number} scale
   * @returns {Vector}
   */
  scale(scale) {
    return new Vector(this.x * scale, this.y * scale)
  }
  /**
   * @param {Vector} v
   * @returns {number}
   */
  distance(v) {
    const diff = this.sub(v)
    return Math.sqrt(diff.x * diff.x + diff.y * diff.y)
  }
}
