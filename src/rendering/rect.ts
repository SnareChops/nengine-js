import { Color } from '../color.js'
import type { Position, Context } from '../types/index.js'

/** Draw a rectangular border on the provided context */
export function strokeRect(dest: Context, corner1: Position, corner2: Position, width: number, color: Color) {
  const minX = Math.min(corner1.x(), corner2.x())
  const minY = Math.min(corner1.y(), corner2.y())
  const maxX = Math.max(corner1.x(), corner2.x())
  const maxY = Math.max(corner1.y(), corner2.y())
  dest.strokeStyle = color.hex()
  dest.lineWidth = width
  dest.strokeRect(minX, minY, maxX - minX, maxY - minY)
}
