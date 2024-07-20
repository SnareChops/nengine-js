import { Color } from '../color.js'

/**
 * Draw a rectangular border on the provided context
 * @param {import('../image.js').Context} dest
 * @param {import('../types/index.js').Position} corner1
 * @param {import('../types/index.js').Position} corner2
 * @param {number} width
 * @param {Color} color
 */
export function strokeRect(dest, corner1, corner2, width, color) {
  const minX = Math.min(corner1.x(), corner2.x())
  const minY = Math.min(corner1.y(), corner2.y())
  const maxX = Math.max(corner1.x(), corner2.x())
  const maxY = Math.max(corner1.y(), corner2.y())
  dest.strokeStyle = color.hex()
  dest.lineWidth = width
  dest.strokeRect(minX, minY, maxX - minX, maxY - minY)
}
