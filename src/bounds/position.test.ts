import assert from '@snarechops/testit'
import { Position } from './position.js'

export function testSetPos() {
  let point = new Position(0, 0)
  point.setPos2(10, 12)
  assert.equal(10, point.x())
  assert.equal(12, point.y())

  point = new Position(0, 0)
  point.setPos3(10, 11, 12)
  assert.equal(10, point.x())
  assert.equal(11, point.y())
  assert.equal(12, point.z())
}

export function testGridAlign() {
  let point = new Position(0, 0)
  point.gridAlign(64, 64)
  assert.equal(0, point.x(), '0 -> 0')
  assert.equal(0, point.y(), '0 -> 0')

  point = new Position(10, 10)
  point.gridAlign(64, 64)
  assert.equal(0, point.x(), '10 -> 0')
  assert.equal(0, point.y(), '10 -> 0')

  point = new Position(65, 65)
  point.gridAlign(64, 64)
  assert.equal(64, point.x(), '65 -> 64')
  assert.equal(64, point.y(), '65 -> 64')
}
