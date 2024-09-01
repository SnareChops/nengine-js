import assert from '@snarechops/testit'
import { Box } from './box.js'
import { CENTER } from './bounds.js'

export function testBoxInit() {
  const box = new Box(2, 4)
  assert.equal(0, box.x())
  assert.equal(0, box.y())
  const [x, y] = box.offset()
  assert.equal(0, x)
  assert.equal(0, y)
  const [w, h] = box.size()
  assert.equal(2, w)
  assert.equal(4, h)
  assert.equal(0, box.rotation())
  assert.equal(2, box.dx())
  assert.equal(4, box.dy())
  {
    const [x, y] = box.min()
    assert.equal(0, x)
    assert.equal(0, y)
  }
  {
    const [x, y] = box.mid()
    assert.equal(1, x)
    assert.equal(2, y)
    assert.equal(1, box.midX())
    assert.equal(2, box.midY())
  }
  {
    const [x, y] = box.max()
    assert.equal(1, x)
    assert.equal(3, y)
    assert.equal(1, box.maxX())
    assert.equal(3, box.maxY())
  }
}

export function testBoxPositioned() {
  const box = new Box(2, 4)
  box.setPos2(10, 20)
  assert.equal(10, box.x(), 'x')
  assert.equal(20, box.y(), 'y')
  {
    const [w, h] = box.size()
    assert.equal(2, w, 'w')
    assert.equal(4, h, 'h')
    assert.equal(0, box.rotation(), 'rotation')
    assert.equal(2, box.dx(), 'dx')
    assert.equal(4, box.dy(), 'dy')
  }
  {
    const [x, y] = box.min()
    assert.equal(10, x, 'min x')
    assert.equal(20, y, 'min y')
  }
  {
    const [x, y] = box.mid()
    assert.equal(11, x, 'mid x')
    assert.equal(22, y, 'mid y')
    assert.equal(11, box.midX(), 'midX')
    assert.equal(22, box.midY(), 'midY')
  }
  {
    const [x, y] = box.max()
    assert.equal(11, x, 'max x')
    assert.equal(23, y, 'max y')
    assert.equal(11, box.maxX(), 'maxX')
    assert.equal(23, box.maxY(), 'maxY')
  }
}

export function testBoxOffset() {
  const box = new Box(2, 4)
  box.setPos2(10, 20)
  box.setAnchor(CENTER, CENTER)
  assert.equal(10, box.x())
  assert.equal(20, box.y())
  {
    const [w, h] = box.size()
    assert.equal(2, w)
    assert.equal(4, h)
    assert.equal(0, box.rotation())
    assert.equal(2, box.dx())
    assert.equal(4, box.dy())
  }
  {
    const [x, y] = box.min()
    assert.equal(9, x)
    assert.equal(18, y)
  }
  {
    const [x, y] = box.mid()
    assert.equal(10, x)
    assert.equal(20, y)
    assert.equal(10, box.midX())
    assert.equal(20, box.midY())
  }
  {
    const [x, y] = box.max()
    assert.equal(10, x)
    assert.equal(21, y)
    assert.equal(10, box.maxX())
    assert.equal(21, box.maxY())
  }
}
