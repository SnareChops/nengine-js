import assert from '@snarechops/testit'
import { CENTER } from './bounds.js'
import { Raw } from './raw.js'
import { Relative } from './relative.js'

export function testRelativeBoundsAnchor() {
  const parent = new Raw(10, 10)
  const result = new Relative(parent, 8, 8)
  result.setAnchor(CENTER, CENTER)
  assert.equal([-4, -4], result.min())
}
