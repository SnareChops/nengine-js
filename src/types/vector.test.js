import assert from '@snarechops/testit'
import { Vector } from './vector.js'

export function testVectorAdd() {
  let v = new Vector(0, 0).add(new Vector(0, 0))
  assert.equal(0, v.x)
  assert.equal(0, v.y)

  v = new Vector(1, 2).add(new Vector(3, 4))
  assert.equal(4, v.x)
  assert.equal(6, v.y)
}

export function testVectorSub() {
  let v = new Vector(0, 0).sub(new Vector(0, 0))
  assert.equal(0, v.x)
  assert.equal(0, v.y)

  v = new Vector(3, 4).sub(new Vector(1, 2))
  assert.equal(2, v.x)
  assert.equal(2, v.y)

  v = new Vector(1, 2).sub(new Vector(3, 4))
  assert.equal(-2, v.x)
  assert.equal(-2, v.y)
}

export function testVectorNormalize() {
  let v = new Vector(0, 0).normalize()
  assert.equal(0, v.x)
  assert.equal(0, v.y)
}
