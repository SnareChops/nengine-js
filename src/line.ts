import type { Context } from './types/index.js'
import type { Color } from './color.js'

/** Represents a line */
export class Line {
  x1: number
  y1: number
  x2: number
  y2: number

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }
}
/** Draws a line to the provided context */
export function drawLine(ctx: Context, line: Line, size: number, color: Color) {
  ctx.moveTo(line.x1, line.y1)
  ctx.lineTo(line.x2, line.y2)
  ctx.strokeStyle = color.hex()
  ctx.lineWidth = size
  ctx.stroke()
}
