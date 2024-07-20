import assert from '@snarechops/testit'
import { bitmaskAdd, bitmaskRemove, isSet } from './index.js'

export function testIsSet() {
  const b = 0b101
  assert.true(isSet(b, 0b001))
  assert.false(isSet(b, 0b010))
  assert.true(isSet(b, 0b100))
}

export function testBitmaskAdd() {
  const b = 0b101
  assert.equal(0b111, bitmaskAdd(b, 0b010))
}

export function testBitmaskRemove() {
  const b = 0b101
  assert.equal(0b001, bitmaskRemove(b, 0b100))
}
