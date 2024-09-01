import assert from '@snarechops/testit'
import { Point, NewBox, RawBounds } from '../bounds/index.js'
import { NavMesh } from './mesh.js'

export function testLargePathfind() {
  const height = 2208 * 4
  const width = 976 * 4
  const hspacing = 16 * 4
  const vspacing = 16 * 4
  const hoffset = hspacing / 2
  const voffset = vspacing / 2
  const mesh = new NavMesh(height, width, hspacing, vspacing, hoffset, voffset)

  const start = Point(32, 32)
  const end = Point(8768, 3840)

  const path = mesh.pathfind(start, end, true)
  for (const vec of path) {
    const [x, y] = vec.pos2()
  }
}

export function testNoPathFound() {
  // Test the A* algorithm
  const collider = NewBox(64, 320)
  collider.setPos2(128, 0)
  const mesh = new NavMesh(320, 320, 64, 64, 32, 32)
  mesh.maskNodesWithin(collider, 1)

  const start = Point(64, 64)
  const end = Point(256, 256)
  const path = mesh.pathfind(start, end, true)
  assert.equal(0, path.length)
}

export function testPathfindWithNodeMasks() {
  const MASK_1 = 1 << 1
  const MASK_2 = 1 << 2
  const MASK_3 = 1 << 3
  const box = NewBox(64, 320)
  box.setPos2(128, 0)
  const mesh = new NavMesh(320, 320, 64, 64, 32, 32)
  mesh.maskNodesWithin(box, MASK_1 | MASK_2 | MASK_3)

  const start = Point(64, 64)
  const end = Point(256, 256)

  // No path
  let path = mesh.pathfind(start, end, true)
  assert.equal(0, path.length)

  // Path matching MASK_1
  path = mesh.pathfind(start, end, true, MASK_1)
  assert.equal(4, path.length, 'MASK_1')

  // Path matching MASK_2|MASK_3
  path = mesh.pathfind(start, end, true, MASK_2 | MASK_3)
  assert.equal(4, path.length, 'MASK_2|MASK_3')
}

export function testClosestNodes() {
  const mesh = new NavMesh(640, 640, 64, 64, 32, 32)
  const pos = Point(220, 365)

  const node = mesh.closestNode(pos)
  if (!node) throw new Error('node undefined')
  assert.equal(3, node.nodeX)
  assert.equal(5, node.nodeY)
}

export function testClosestNodesWithMask() {
  const mesh = new NavMesh(640, 640, 64, 64, 32, 32)
  const pos = Point(220, 365)

  let node = mesh.closestNode(pos, 1)
  assert.equal(3, node.nodeX)
  assert.equal(5, node.nodeY)

  mesh.maskNodesWithin(new RawBounds(640, 640), 1)
  node = mesh.closestNode(pos, 1)
  assert.equal(3, node.nodeX)
  assert.equal(5, node.nodeY)
}

export function testClosestExpandingSearch() {
  const mesh = new NavMesh(640, 640, 64, 64, 32, 32)
  const pos = Point(220, 365)

  const b = new RawBounds(65, 65)
  b.setPos2(Math.floor((220 / 64) * 64), Math.floor((365 / 64) * 64))
  mesh.maskNodesWithin(b, 1)

  let node = mesh.closestNode(pos, 0)
  assert.equal(3, node.nodeX)
  assert.equal(5, node.nodeY)
}
