/**
 * @param {import('../types/index.js').Position} from
 * @param {import('../types/index.js').Position} to
 * @returns {[number, number]}
 */
export function directionVector(from, to) {
  const [x1, y1] = from.pos2()
  const [x2, y2] = to.pos2()
  const dx = x2 - x1
  const dy = y2 - y1
  const dist = Math.sqrt(dx * dx + dy * dy)
  return [dx / dist, dy / dist]
}

/**
 * Gets the distance between two given positions
 * @param {import('../types/index.js').Position} start
 * @param {import('../types/index.js').Position} end
 * @returns {number}
 */
export function distanceBetween(start, end) {
  return distanceBetweenPoints(...start.xy(), ...end.xy())
}
/**
 * Gets the distance between two given sets of points
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
export function distanceBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}
/**
 * Gets the x,y position from the given x,y position
 * at the given distance away along the given angle
 * @param {number} x
 * @param {number} y
 * @param {number} angle
 * @param {number} dist
 * @returns {[x: number, y: number]}
 */
export function pointAtAngleWithDistance(x, y, angle, dist) {
  return [x + dist * Math.cos(angle), y + dist * Math.sin(angle)]
}
/**
 * Gets the angle from point a to point b
 * @param {import('../types/index.js').Position} a
 * @param {import('../types/index.js').Position} b
 * @returns {number}
 */
export function angleBetween(a, b) {
  return angleBetweenPoints(...a.xy(), ...b.xy())
}
/**
 * Gets the angle (in radians) between two points
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
export function angleBetweenPoints(x1, y1, x2, y2) {
  const result = Math.atan2(y2 - y1, x2 - x1)
  if (result < 0) {
    return result + 2 * Math.PI
  }
  return result
}
/**
 * Returns the point on a line between two points at the given percentage
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} percent
 * @returns {[number, number]}
 */
export function lerp(x1, y1, x2, y2, percent) {
  return [x1 + (x2 - x1) * percent, y1 + (y2 - y1) * percent]
}
/**
 * Returns the value at a given percentage from a to b
 * @param {number} a
 * @param {number} b
 * @param {number} percent
 * @returns {number}
 */
export function linearInterpolate(a, b, percent) {
  return a + (b - a) * percent
}
/**
 * Normalizes a vector
 * @param {number} x
 * @param {number} y
 * @returns {[x: number, y: number]}
 */
export function normalizeVector(x, y) {
  const length = Math.sqrt(x * x + y * y)
  if (length == 0) {
    return [0, 0]
  }
  return [x / length, y / length]
}
/**
 * Gets the normal vector of a line
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {[x: number, y: number]}
 */
export function normalVector(x1, y1, x2, y2) {
  return [-(y2 - y1), x2 - x1]
}
/**
 * Translates a number in a given range, to the same value in a different range
 * @param {number} value
 * @param {number} minA
 * @param {number} maxA
 * @param {number} minB
 * @param {number} maxB
 * @returns {number}
 */
export function translateNumberBetweenRanges(value, minA, maxA, minB, maxB) {
  return ((value - minA) / (maxA - minA)) * (maxB - minB) + minB
}
/**
 * Returns the provided number, keeping it in the provided range
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(num, min, max) {
  if (num < min) {
    return min
  }
  if (num > max) {
    return max
  }
  return num
}
/**
 * @param {import('../types/index.js').Position} start
 * @param {import('../types/index.js').Position} end
 * @param {number} speed
 * @param {number} delta
 * @returns {[x: number, y: number]}
 */
export function moveTowards(start, end, speed, delta) {
  const length = speed / delta
  const dist = distanceBetween(start, end)
  if (dist <= length) return end.xy()
  const angle = angleBetween(start, end)
  return pointAtAngleWithDistance(...start.xy(), angle, length)
}
/**
 * @param {number} a
 * @param {number} b
 * @param {number} decay
 * @param {number} delta
 * @returns {number}
 */
export function exponentialDecay(a, b, decay, delta) {
  return a + (a - b) * Math.exp(-decay * delta) // seconds
}
