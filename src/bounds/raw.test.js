import assert from '@snarechops/testit'
import { BOTTOM, CENTER, LEFT, RIGHT, TOP } from './bounds.js'
import { Raw } from './raw.js'

export function testBoundsOffset() {
  let result = new Raw(2, 4)
  result.setAnchor(CENTER, CENTER)
  const [x, y] = result.offset()
  assert.equal(1, x)
  assert.equal(2, y)
}

export function testBoundsRotation() {
  const result = new Raw(200, 300)
  result.setRotation(2.3)
  assert.equal(2.3, result.rotation())
}

export function testBoundsSize() {
  let result = new Raw(2, 3)
  assert.equal([2, 3], result.size())

  result = new Raw(2, 3)
  result.resize(2, 2)
  assert.equal([2, 2], result.size())
}

export function testMax() {
  const result = new Raw(10, 10)
  assert.equal([9, 9], result.max())
}

export function testMin() {
  const result = new Raw(10, 10)
  assert.equal([0, 0], result.min())
}

export function testRawResize() {
  const b = new Raw(10, 20)
  b.setPos2(100, 100)
  b.setAnchor(CENTER, CENTER)
  assert.equal(10, b.dx())
  assert.equal(10, b.width())
  assert.equal(20, b.dy())
  assert.equal(20, b.height())
  assert.equal([5, 10], b.offset())
  assert.equal([10, 20], b.size())
  assert.equal([100, 100], b.mid())
  assert.equal([104, 109], b.max())
  assert.equal(104, b.maxX())
  assert.equal(109, b.maxY())

  b.resize(20, 30)
  assert.equal(20, b.dx())
  assert.equal(20, b.width())
  assert.equal(30, b.dy())
  assert.equal(30, b.height())
  assert.equal([10, 15], b.offset())
  assert.equal([20, 30], b.size())
  assert.equal([100, 100], b.mid())
  assert.equal([109, 114], b.max())
  assert.equal(109, b.maxX())
  assert.equal(114, b.maxY())
}
