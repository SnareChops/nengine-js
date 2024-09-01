import type { Box, Position } from '../types/index.js'

export function doesCollide(a: Box, b: Box): boolean {
  const [x1m, y1m] = a.min()
  const [x1M, y1M] = a.max()

  const [x2m, y2m] = b.min()
  const [x2M, y2M] = b.max()

  return !(x2M < x1m || x2m > x1M || y2M < y1m || y2m > y1M)
}

export function isWithin(box: Box, x: number, y: number): boolean {
  const [w, h] = box.size()
  const [bx, by] = box.min()
  if (w === 1 && h === 1) {
    return x === bx && y === by
  }
  const [x2, y2] = box.max()
  return x >= bx && x <= x2 && y >= by && y <= y2
}

export function isPosWithin(box: Box, pos: Position): boolean {
  return isWithin(box, pos.x(), pos.y())
}
