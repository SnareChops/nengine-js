import assert from '@snarechops/testit'
import {
  angleBetweenPoints,
  distanceBetweenPoints,
  pointAtAngleWithDistance,
} from './trig.js'

export function testDistanceBetweenPoints() {
  let result = distanceBetweenPoints(2, 3, 2, 4)
  assert.equal(1, result)

  result = distanceBetweenPoints(3, 4, 2, 4)
  assert.equal(1, result)

  result = distanceBetweenPoints(3, 3, 2, 4)
  assert.equal(1.4142135623730951, result)
}

export function testAngleBetweenPoints() {
  let result = angleBetweenPoints(2, 3, 3, 3)
  assert.equal(0, result)

  result = angleBetweenPoints(2, 3, 2, 4)
  assert.equal(Math.PI / 2, result)

  result = angleBetweenPoints(2, 3, 1, 3)
  assert.equal(Math.PI, result)

  result = angleBetweenPoints(2, 3, 2, 2)
  assert.equal((3 * Math.PI) / 2, result)

  result = angleBetweenPoints(2, 3, 3, 4)
  assert.equal(Math.PI / 4, result)

  // Distance greater than 1 tests
  result = angleBetweenPoints(2, 3, 4, 3)
  assert.equal(0, result)

  result = angleBetweenPoints(2, 3, 2, 5)
  assert.equal(Math.PI / 2, result)

  result = angleBetweenPoints(2, 3, 2, 0)
  assert.equal((3 * Math.PI) / 2, result)

  result = angleBetweenPoints(2, 3, 0, 3)
  assert.equal(Math.PI, result)

  result = angleBetweenPoints(600, 900, 600, 800)
  assert.equal((3 * Math.PI) / 2, result)

  result = angleBetweenPoints(256, 384, 266, 384)
  assert.equal(0, result)
}

export function testPointAtAngleWithLength() {
  let angle = angleBetweenPoints(2, 3, 2, 4)
  let length = distanceBetweenPoints(2, 3, 2, 4)
  assert.equal([2, 4], pointAtAngleWithDistance(2, 3, angle, length))

  angle = angleBetweenPoints(2, 3, 1, 2)
  length = distanceBetweenPoints(2, 3, 1, 2)
  const [x, y] = pointAtAngleWithDistance(2, 3, angle, length)
  assert.equal(1, Math.round(x))
  assert.equal(2, Math.round(y))
}
