import { Box } from './bounds/index.js'
/**
 * Given a set of rectangles, try and combine them into larger rectangles
 * where possible.
 * Walks all rectangles horizontally, combining where possible
 * Next walks all rectangles vertically, combining where possible
 * @param {import('./types/index.js').Rect[]} rects
 * @returns {import('./types/index.js').Rect[]}
 */
export function combineRects(rects) {
  // Combine horizontally
  for (let a = 0; a < rects.length; a++) {
    let b = a + 1
    while (b < rects.length) {
      // If a is the same height as b
      // and a is at the same y value as b
      // and b is touching the left side of a
      if (
        rects[a].minY == rects[b].minY &&
        rects[a].maxY == rects[b].maxY &&
        rects[a].maxX == rects[b].minX
      ) {
        // Combine b into a and delete b
        rects[a].maxX = rects[b].maxX
        rects.splice(b, 1)
      } else {
        b++
      }
    }
  }
  // Combine vertically
  for (let a = 0; a < rects.length; a++) {
    let b = a + 1
    while (b < rects.length) {
      // If a is same width as b
      // and a is at same x value as b
      // and b is touching the bottom of a
      if (
        rects[a].minX == rects[b].minX &&
        rects[a].maxX == rects[b].maxX &&
        rects[a].maxY == rects[b].minY
      ) {
        // Combine b into a and delete b
        rects[a].maxY = rects[b].maxY
        rects.splice(b, 1)
      }
    }
  }
  return rects
}
/**
 * Convert a set of rectangles into RawBounds
 * @param {import('./types/index.js').Rect[]} rects
 * @returns {import('./types/index.js').Box[]}
 */
export function rectsToBounds(rects) {
  /** @type {import('./types/index.js').Box[]} */
  const out = []
  for (const rect of rects) {
    const bounds = new Box(rect.maxX - rect.minX, rect.maxY - rect.minY)
    bounds.setPos2(rect.minX, rect.minY)
    out.push(bounds)
  }
  return out
}
