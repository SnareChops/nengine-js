import { Point } from './bounds/index.js'
import { isPosWithin } from './utils/index.js'
import { createCanvas } from './image.js'

/**
 * Floors a number ensuring it is a whole integer
 * @param {number} n
 * @returns {number}
 */
export function int(n) {
  return Math.floor(n)
}
/**
 * Floors two number ensuing they are whole integers
 * @param {number} a
 * @param {number} b
 * @returns {[c: number, d: number]}
 */
export function ints(a, b) {
  return [int(a), int(b)]
}
/**
 * Transforms a coordinate to a relative coordinate within the bounds
 * @param {number} x
 * @param {number} y
 * @param {import('./types/index.js').Box} box
 * @returns {[x: number, y: number]}
 */
export function relativePosition(x, y, box) {
  const [bx, by] = box.min()
  return [x - bx, y - by]
}
/**
 * @typedef VerticalRelative
 * @prop {() => [x: number, y: number]} pos2
 * @prop {() => number} dy
 */
/**
 * Gets the x, y coordinate directly below the provided object
 * Useful for positioning things relative to each other
 * Padding is the space that should be added to the y coordinate
 * Note: X will be the same as the object's X
 * @param {VerticalRelative} object
 * @param {number} padding
 * @returns {[x: number, y: number]}
 */
export function positionBelow(object, padding) {
  const [x, y] = object.pos2()
  return [x, y + object.dy() + padding]
}
/**
 * @typedef HorizontalRelative
 * @prop {() => [x: number, y: number]} pos2
 * @prop {() => number} dx
 */
/**
 * Gets the x, y coordinate directly to the right of the provided
 * object.
 * Useful for positioning things relative to eachother
 * Padding is the space that should be added the the x coordinate
 * Note: Y will be the same as the object's Y
 * @param {HorizontalRelative} object
 * @param {number} padding
 * @returns {[x: number, y: number]}
 */
export function positionRight(object, padding) {
  const [x, y] = object.pos2()
  return [x + object.dx() + padding, y]
}
/**
 * Scale and fit an image to a new image
 * @param {number} w
 * @param {number} h
 * @param {import('./image.js').Image} image
 * @returns {import('./image.js').Image}
 */
export function fitToNewImage(w, h, image) {
  const [canvas, ctx] = createCanvas(w, h)
  ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, w, h)
  return canvas
}
/**
 * @param {import('./types/index.js').Box} box
 * @param {number} gridWidth
 * @param {number} gridHeight
 * @returns {import('./types/index.js').Position[]}
 */
export function gridPointsAroundBox(box, gridWidth, gridHeight) {
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
  const points = [pos]
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
