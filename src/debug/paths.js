import { Position } from '../bounds/position.js'
import { Color } from '../color.js'
import { debugEnabled } from './debug.js'

/**
 * @typedef path
 * @prop {Position[]} points
 * @prop {Color} color
 */
/** @type {Map<any, path>} */
let paths = new Map()
/**
 * @param {any} ptr
 * @param {Position[]} points
 * @param {Color} color
 * @returns
 */
export function addPath(ptr, points, color) {
  if (!debugEnabled) return
  if (paths.has(ptr)) return
  paths.set(ptr, { points, color })
}
/**
 * @param {any} ptr
 */
export function removePath(ptr) {
  if (!debugEnabled) return
  paths.delete(ptr)
}
/**
 * @param {import('../image.js').Context} ctx
 * @param {import('../types/index.d.ts').Camera} camera
 */
export function drawPaths(ctx, camera) {
  if (!debugEnabled) return
  for (const path of paths.values()) {
    for (let [i, j] = [0, 1]; j < path.points.length; [i, j] = [i + 1, j + 1]) {
      const [x1, y1] = camera.worldToScreenPos(...path.points[i].xy())
      const [x2, y2] = camera.worldToScreenPos(...path.points[j].xy())
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
    }
  }
}
/**
 * Returns the current debug paths
 * @returns {Map<any, path>}
 */
export function debugPaths() {
  return paths
}
