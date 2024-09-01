import assert from '@snarechops/testit'
import { Timer, TimerStageIdle } from './timer.js'

export function testSkillTimersStatusProgression() {
  const timer = new Timer()
  const a = timer.addStage(30)
  const b = timer.addStage(40)
  const c = timer.addStage(20)
  const d = timer.addStage(10)

  assert.equal(TimerStageIdle, timer.stage())
  assert.false(timer.elapsed(TimerStageIdle))
  timer.start(false)
  assert.equal(a, timer.stage())
  assert.true(timer.elapsed(TimerStageIdle))

  timer.update(10) // 10
  assert.equal(a, timer.stage())

  timer.update(10) // 20
  assert.equal(a, timer.stage())

  assert.false(timer.elapsed(a))
  timer.update(10) // 30
  assert.equal(b, timer.stage())
  assert.true(timer.elapsed(a))

  timer.update(10) // 10
  assert.equal(b, timer.stage())

  timer.update(10) // 20
  assert.equal(b, timer.stage())

  timer.update(10) // 30
  assert.equal(b, timer.stage())

  assert.false(timer.elapsed(b))
  timer.update(10) // 40
  assert.equal(c, timer.stage())
  assert.true(timer.elapsed(b))

  timer.update(10) // 10
  assert.equal(c, timer.stage())

  assert.false(timer.elapsed(c))
  timer.update(10) // 20
  assert.equal(d, timer.stage())
  assert.true(timer.elapsed(c))

  assert.false(timer.elapsed(d))
  timer.update(10) // 10
  assert.equal(TimerStageIdle, timer.stage())
  assert.true(timer.elapsed(d))

  timer.update(10)
  assert.equal(TimerStageIdle, timer.stage())
}
