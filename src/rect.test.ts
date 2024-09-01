import assert from '@snarechops/testit'
import { combineRects, rectsToBounds } from './rect.js'
import type { Rect } from './types/index.js'

function rect(minX: number, minY: number, maxX: number, maxY: number): Rect {
  return { minX, minY, maxX, maxY }
}

export function testCombineRects() {
  const rects = [
    rect(0, 0, 1, 1),
    rect(0, 1, 1, 2),
    rect(1, 0, 2, 1),
    rect(1, 1, 2, 2),
  ]
  const result = combineRects(rects)

  assert.equal(1, result.length)
  assert.equal(0, result[0].minX)
  assert.equal(0, result[0].minY)
  assert.equal(2, result[0].maxX)
  assert.equal(2, result[0].maxY)

  const bounds = rectsToBounds(result)
  assert.equal(1, bounds.length)
  assert.equal([2, 2], bounds[0].size())
  assert.equal([0, 0], bounds[0].pos2())
}

export function testCombineRectsExample() {
  const rects = [
    rect(0, 3520, 64, 3584),
    rect(64, 3520, 128, 3584),
    rect(128, 3520, 192, 3584),
    rect(192, 3520, 256, 3584),
    rect(256, 3520, 320, 3584),
    rect(320, 3520, 384, 3584),
    rect(0, 3584, 64, 3648),
    rect(64, 3584, 128, 3648),
    rect(128, 3584, 192, 3648),
    rect(192, 3584, 256, 3648),
    rect(256, 3584, 320, 3648),
    rect(320, 3584, 384, 3648),
  ]

  const result = combineRects(rects)
  assert.equal(1, result.length)
  assert.equal(0, result[0].minX)
  assert.equal(3520, result[0].minY)
  assert.equal(384, result[0].maxX)
  assert.equal(3648, result[0].maxY)
}
