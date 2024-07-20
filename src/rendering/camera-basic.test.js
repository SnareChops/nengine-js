import assert from '@snarechops/testit'
import { Box } from '../bounds/index.js'
import { BasicCamera } from './camera-basic.js'

export function testCameraSetPos() {
  const c = new BasicCamera(10, 10, 20, 20)
  assert.equal([5, 5], c.pos())
  assert.equal(0, c.minX())
  assert.equal(0, c.minY())
  assert.equal(10, c.maxX())
  assert.equal(10, c.maxY())

  c.setPos(0, 0)
  assert.equal([5, 5], c.pos())
  assert.equal(0, c.minX())
  assert.equal(0, c.minY())
  assert.equal(10, c.maxX())
  assert.equal(10, c.maxY())

  c.setPos(20, 20)
  assert.equal([15, 15], c.pos())
  assert.equal(10, c.minX())
  assert.equal(10, c.minY())
  assert.equal(20, c.maxX())
  assert.equal(20, c.maxY())

  c.setPos(0, 5)
  assert.equal([5, 5], c.pos())
  assert.equal(0, c.minX())
  assert.equal(0, c.minY())
  assert.equal(10, c.maxX())
  assert.equal(10, c.maxY())

  c.setPos(5, 0)
  assert.equal([5, 5], c.pos())
  assert.equal(0, c.minX())
  assert.equal(0, c.minY())
  assert.equal(10, c.maxX())
  assert.equal(10, c.maxY())

  c.setPos(20, 5)
  assert.equal([15, 5], c.pos())
  assert.equal(10, c.minX())
  assert.equal(0, c.minY())
  assert.equal(20, c.maxX())
  assert.equal(10, c.maxY())

  c.setPos(5, 20)
  assert.equal([5, 15], c.pos())
  assert.equal(0, c.minX())
  assert.equal(10, c.minY())
  assert.equal(10, c.maxX())
  assert.equal(20, c.maxY())

  c.setPos(-100, -100)
  assert.equal([5, 5], c.pos())
  assert.equal(0, c.minX())
  assert.equal(0, c.minY())
  assert.equal(10, c.maxX())
  assert.equal(10, c.maxY())

  c.setPos(100, 100)
  assert.equal([15, 15], c.pos())
  assert.equal(10, c.minX())
  assert.equal(10, c.minY())
  assert.equal(20, c.maxX())
  assert.equal(20, c.maxY())
}

export function testCameraView() {
  let c = new BasicCamera(200, 100, 3000, 2000)
  assert.equal([0, 0, 200, 100], c.view())

  c = new BasicCamera(200, 100, 3000, 2000)
  c.setPos(20, 10)
  assert.equal([0, 0, 200, 100], c.view())

  c = new BasicCamera(200, 100, 3000, 2000)
  c.setPos(2980, 1990)
  assert.equal([2800, 1900, 3000, 2000], c.view())

  c = new BasicCamera(200, 100, 3000, 2000)
  c.setPos(1500, 1000)
  assert.equal([1400, 950, 1600, 1050], c.view())
}

export function testCameraWorldToScreenPos() {
  let c = new BasicCamera(10, 10, 20, 20)
  assert.equal([2, 2], c.worldToScreenPos(2, 2))
  assert.equal([19, 19], c.worldToScreenPos(19, 19))

  c.setPos(8, 8)
  assert.equal([-1, -1], c.worldToScreenPos(2, 2))
  assert.equal([7, 7], c.worldToScreenPos(10, 10))

  c = new BasicCamera(1920, 1080, 5000, 6000)
  assert.equal([400, 500], c.worldToScreenPos(400, 500))

  c = new BasicCamera(1920, 1080, 5000, 6000)
  c.setPos(1000, 900)
  assert.equal([360, 140], c.worldToScreenPos(400, 500))
}

export function testScreenToWorldPos() {
  const c = new BasicCamera(10, 10, 20, 20)
  assert.equal([2, 2], c.screenToWorldPos(2, 2))
  assert.equal([19, 19], c.screenToWorldPos(19, 19))

  c.setPos(8, 8)
  assert.equal([2, 2], c.screenToWorldPos(-1, -1))
  assert.equal([10, 10], c.screenToWorldPos(7, 7))
}

export function testNewCameraWorldToScreenPosWithZoom() {
  let c = new BasicCamera(10, 10, 20, 20)
  c.setZoom(2)
  assert.equal([-1, -1], c.worldToScreenPos(2, 2))

  c.setPos(8, 8)
  assert.equal([-7, -7], c.worldToScreenPos(2, 2))

  c = new BasicCamera(10, 10, 20, 20)
  assert.equal([2, 2], c.worldToScreenPos(2, 2))

  c.setZoom(2)
  assert.equal([-1, -1], c.worldToScreenPos(2, 2))

  c.setZoom(0.5)
  assert.equal([1, 1], c.worldToScreenPos(2, 2))
}

export function testCameraWorldToScreenPosWithZoomAndPos() {
  let c = new BasicCamera(10, 10, 20, 20)
  c.setPos(5, 5)
  assert.equal([2, 2], c.worldToScreenPos(2, 2))

  c.setZoom(2)
  assert.equal([-1, -1], c.worldToScreenPos(2, 2))

  c.setZoom(0.5)
  assert.equal([1, 1], c.worldToScreenPos(2, 2))
}

export function testCameraViewConsistentRectSize() {
  let c = new BasicCamera(200, 100, 2000, 1000)
  assert.equal([0, 0, 200, 100], c.view())

  c.setZoom(2)
  assert.equal([50, 25, 150, 75], c.view())
}

export function testCameraScreenToWorldPosWithZoom() {
  let c = new BasicCamera(200, 100, 2000, 1000)
  c.setZoom(0.5)
  assert.equal([-60, -30], c.screenToWorldPos(20, 10))

  c = new BasicCamera(200, 100, 2000, 1000)
  c.setZoom(2)
  assert.equal([60, 30], c.screenToWorldPos(20, 10))
}

export function testCameraFollow() {
  let c = new BasicCamera(1920, 1080, 5000, 5000)
  let b = new Box(32, 32)
  b.setPos2(796, 786)
  c.follow(b)
  c.setPos(796, 786)
  assert.equal([960, 786], c.pos())

  b.setPos2(800, 900)
  c.update()
  assert.equal([960, 900], c.pos())

  b.setPos2(1000, 900)
  c.update()
  assert.equal([1000, 900], c.pos())
}
