import { Point } from './bounds/index.js'
import { isPosWithin, distanceBetween } from './utils/index.js'
import { createCanvas } from './types/index.js'
import type { Box, Image, Position } from './types/index.js'

/** Floors a number ensuring it is a whole integer */
export function int(n: number): number {
  return Math.floor(n)
}
/** Floors two number ensuing they are whole integers */
export function ints(a: number, b: number): [c: number, d: number] {
  return [int(a), int(b)]
}
/** Transforms a coordinate to a relative coordinate within the bounds */
export function relativePosition(x: number, y: number, box: Box): [x: number, y: number] {
  const [bx, by] = box.min()
  return [x - bx, y - by]
}
export interface VerticalRelative {
  pos2(): [x: number, y: number]
  dy(): number
}
/**
 * Gets the x, y coordinate directly below the provided object
 * Useful for positioning things relative to each other
 * Padding is the space that should be added to the y coordinate
 * Note: X will be the same as the object's X
 */
export function positionBelow(object: VerticalRelative, padding: number): [x: number, y: number] {
  const [x, y] = object.pos2()
  return [x, y + object.dy() + padding]
}
export interface HorizontalRelative {
  pos2(): [x: number, y: number]
  dx(): number
}
/**
 * Gets the x, y coordinate directly to the right of the provided
 * object.
 * Useful for positioning things relative to eachother
 * Padding is the space that should be added the the x coordinate
 * Note: Y will be the same as the object's Y
 */
export function positionRight(object: HorizontalRelative, padding: number): [x: number, y: number] {
  const [x, y] = object.pos2()
  return [x + object.dx() + padding, y]
}
/** Scale and fit an image to a new image */
export function fitToNewImage(w: number, h: number, image: Image): Image {
  const ctx = createCanvas(w, h)
  ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, w, h)
  return ctx.canvas
}

export function gridPointsAroundBox(box: Box, gridWidth: number, gridHeight: number): Position[] {
  // Snap top left of bounds to grid
  const pos = Point(...box.min())
  pos.gridAlign(gridWidth, gridHeight)
  // Then add half grid width and height to get the center
  pos.setPos2(pos.x() + gridWidth / 2, pos.y() + gridHeight / 2)
  // Check if this point is inside the bounds
  if (isPosWithin(box, pos)) {
    // If so, subtract full grid cell
    pos.setPos2(pos.x() - gridWidth, pos.y() - gridHeight)
  }
  /** @type {import('./types/index.js').Position[]} */
  const points: Position[] = [pos]
  const timesWidth = box.dx() / gridWidth
  const timesHeight = box.dy() / gridHeight
  // Walk around bounds at grid cell intervals creating points
  for (let i = 0; i < timesWidth; i++) {
    const last = points[points.length - 1]
    const pos = Point(last.x() + gridWidth, last.y())
    points.push(pos)
  }

  points.push(
    Point(
      points[points.length - 1].x() + gridWidth,
      points[points.length - 1].y(),
    ),
  )
  for (let i = 0; i < timesHeight; i++) {
    const last = points[points.length - 1]
    const pos = Point(last.x(), last.y() + gridHeight)
    points.push(pos)
  }

  points.push(
    Point(
      points[points.length - 1].x(),
      points[points.length - 1].y() + gridHeight,
    ),
  )
  for (let i = 0; i < timesWidth; i++) {
    const last = points[points.length - 1]
    const pos = Point(last.x() - gridWidth, last.y())
    points.push(pos)
  }

  points.push(
    Point(
      points[points.length - 1].x() - gridWidth,
      points[points.length - 1].y(),
    ),
  )
  for (let i = 0; i < timesHeight; i++) {
    const last = points[points.length - 1]
    const pos = Point(last.x(), last.y() - gridHeight)
    points.push(pos)
  }
  return points
}
export function closestPointAroundBox(box: Box, origin: Position, gridWidth: number, gridHeight: number): Position | undefined {
  const points = gridPointsAroundBox(box, gridWidth, gridHeight)
  if (points.length === 0) return void 0
  points.sort((a, b) => distanceBetween(origin, a) - distanceBetween(origin, b))
  return points[0]
}
