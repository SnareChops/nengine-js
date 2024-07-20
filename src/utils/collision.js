/**
 *
 * @param {import('../types/index.js').Box} a
 * @param {import('../types/index.js').Box} b
 * @returns {boolean}
 */
export function doesCollide(a, b) {
  const [x1m, y1m] = a.min()
  const [x1M, y1M] = a.max()

  const [x2m, y2m] = b.min()
  const [x2M, y2M] = b.max()

  return !(x2M < x1m || x2m > x1M || y2M < y1m || y2m > y1M)
}
/**
 * @param {import('../types/index.js').Box} box
 * @param {number} x
 * @param {number} y
 * @returns {boolean}
 */
export function isWithin(box, x, y) {
  const [w, h] = box.size()
  const [bx, by] = box.min()
  if (w === 1 && h === 1) {
    return x === bx && y === by
  }
  const [x2, y2] = box.max()
  return x >= bx && x <= x2 && y >= by && y <= y2
}
/**
 * @param {import('../types/index.js').Box} box
 * @param {import('../types/index.js').Position} pos
 * @returns {boolean}
 */
export function isPosWithin(box, pos) {
  return isWithin(box, pos.x(), pos.y())
}
