import { isSet } from '../bit/index.js'
import { NavNode } from './node.js'
/**
 * @param {NavNode} node
 * @param {number[]} masks
 * @returns {boolean}
 */
export function matchesMasks(node, masks) {
  // Nodes with no mask are ALWAYS walkable
  if (node.mask == 0) {
    return true
  }
  // If no masks, only allow non-masked nodes
  if (masks.length == 0 && node.mask == 0) {
    return true
  }
  // If any mask matches, the node is walkable
  for (const mask of masks) {
    if (isSet(node.mask, mask)) return true
  }
  return false
}
/**
 *
 * @param {NavNode} node
 * @param {NavNode[][]} grid
 * @param {boolean} allowDiagonals
 * @param {number[]} masks
 * @returns {NavNode[]}
 */
export function getNeighbors(node, grid, allowDiagonals, masks) {
  /** @type {NavNode[]} */
  const neighbors = []
  const x = node.nodeX
  const y = node.nodeY
  /** @type {number[][]} */
  let directions = []
  if (allowDiagonals) {
    directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
    ]
  } else {
    directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]
  }
  for (const d of directions) {
    const nx = x + d[0]
    const ny = y + d[1]
    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < grid.length &&
      ny < grid[0].length &&
      matchesMasks(grid[nx][ny], masks)
    ) {
      neighbors.push(grid[nx][ny])
    }
  }
  return neighbors
}
/**
 *
 * @param {NavNode} a
 * @param {NavNode} b
 * @returns {number}
 */
export function heuristic(a, b) {
  const dx = b.nodeX - a.nodeX
  const dy = b.nodeY - a.nodeY
  return Math.sqrt(dx * dx + dy * dy)
}
