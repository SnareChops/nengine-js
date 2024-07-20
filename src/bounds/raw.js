import { BOTTOM, LEFT, RIGHT, TOP } from './bounds.js'
import { Box } from './box.js'
import { Position } from './position.js'

export class Raw extends Box {
  /**
   * @param {Position} a
   * @param {Position} b
   * @returns {Raw}
   */
  static fromPoints(a, b) {
    const x1 = Math.min(a.x(), b.x())
    const y1 = Math.min(a.y(), b.y())
    const x2 = Math.max(a.x(), b.x())
    const y2 = Math.max(a.y(), b.y())
    const raw = new Raw(x2 - x1, y2 - y1)
    raw.setPos2(x1, y1)
    return raw
  }
  /**
   * Gets the normal vector of the provided edge
   * edges: {@link LEFT}, {@link TOP}, {@link RIGHT}, {@link BOTTOM}
   * @param {number} edge
   * @returns {[number, number]}
   */
  normalVectorOf(edge) {
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
        throw new Error('Invalid edge')
    }
  }
  /**
   * Get the edges involved in a collision
   * @param {import('../types/bounds.js').Bounds} other
   * @returns {[number, number]}
   */
  collisionEdges(other) {
    const [w1, h1] = this.size()
    const [x1, y1] = this.min()
    const [w2, h2] = other.size()
    const [x2, y2] = other.min()

    if (x1 + w1 >= x2 && x1 < x2) {
      return [LEFT, RIGHT]
    }
    if (x1 <= x2 + w2 && x1 + w1 > x2 + w2) {
      return [RIGHT, LEFT]
    }
    if (y1 + h1 >= y2 && y1 < y2) {
      return [TOP, BOTTOM]
    }
    if (y1 <= y2 + h2 && y1 + h1 > y2 + h2) {
      return [BOTTOM, TOP]
    }
    return [0, 0]
  }
}
