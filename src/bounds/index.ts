export * from './bounds.js'
export { NewBox } from './box.js'
export { Physics as PhysicsBounds } from './physics.js'
export { Projectile as ProjectileBounds } from './projectile.js'
export { Raw as RawBounds } from './raw.js'
export { Relative as RelativeBounds } from './relative.js'

import { Position } from './position.js'

export function Point(x: number, y: number, z: number = 0): Position {
  const point = new Position()
  point.xyz(x, y, z)
  return point
}
