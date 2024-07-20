/** Represents a line */
export class Line {
  /** @type {number} */
  x1
  /** @type {number} */
  y1
  /** @type {number} */
  x2
  /** @type {number} */
  y2
  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   */
  constructor(x1, y1, x2, y2) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }
}
/**
 * Draws a line to the provided context
 * @param {import('./image.js').Context} ctx
 * @param {Line} line
 * @param {number} size
 * @param {import('./color.js').Color} color
 */
export function drawLine(ctx, line, size, color) {
  ctx.moveTo(line.x1, line.y1)
  ctx.lineTo(line.x2, line.y2)
  ctx.strokeStyle = color.hex()
  ctx.lineWidth = size
  ctx.stroke()
}
