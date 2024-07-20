import assert from '@snarechops/testit'
import { SimpleAnimator } from './simple.js'

export function testSimpleAnimator() {
  const a = new SimpleAnimator([
    // @ts-expect-error
    { duration: 20 },
    // @ts-expect-error
    { duration: 10 },
    // @ts-expect-error
    { duration: 5 },
    // @ts-expect-error
    { duration: 6 },
  ])

  assert.false(a.isActive())
  a.start(false)
  assert.true(a.isActive())

  assert.equal(0, a.index(), 'a')
  a.update(10) //10
  assert.equal(0, a.index(), 'b')

  a.update(10) //20
  assert.equal(1, a.index())

  a.update(10) //30
  assert.equal(2, a.index())

  a.update(10) // 40
  assert.equal(3, a.index())

  a.update(1) // 41
  assert.equal(0, a.index(), 'c')
  assert.false(a.isActive())
}
