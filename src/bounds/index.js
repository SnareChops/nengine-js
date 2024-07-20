export * from './bounds.js'
export * from './box.js'
export { Physics as PhysicsBounds } from './physics.js'
export { Projectile as ProjectileBounds } from './projectile.js'
export { Raw as RawBounds } from './raw.js'
export { Relative as RelativeBounds } from './relative.js'

import { Position } from './position.js'
/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {import('../types/index.js').Position}
 */
export function Point(x, y, z = 0) {
  const point = new Position()
  point.xyz(x, y, z)
  return point
}
