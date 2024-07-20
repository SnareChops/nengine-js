import { Box } from '../bounds/index.js'
/**
 *  ChunkBounds returns a list of bounds split from the original bounds
 * using the maximum provided size
 * Note: This is usually used to facilitate splitting a large Bounds or image
 * into smaller pieces so that it can be used by the Renderer
 * @param {import('../types/index.js').Box} original
 * @param {number} size
 * @return {import('../types/index.js').Box[]}
 */
export function chunkBounds(original, size) {
  /** @type {import('../types/index.js').Box[]} */
  const out = []
  const [x, y] = original.xy()
  const [width, height] = original.size()
  for (let i = 0; i < width; i += size) {
    for (let j = 0; j < height; j += size) {
      /** @type {number} */
      let w = 0
      /** @type {number} */
      let h = 0
      if (i + size > width) w = width - i
      else w = size

      if (j + size > height) h = height - j
      else h = size

      const bounds = new Box(w, h)
      bounds.xy(x + i, y + j)
      out.push(bounds)
    }
  }
  return out
}
