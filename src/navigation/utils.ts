import { isSet } from '../bit/index.js'
import { NavNode } from './node.js'

export function matchesMasks(node: NavNode, masks: number[]): boolean {
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

export function getNeighbors(node: NavNode, grid: NavNode[][], allowDiagonals: boolean, masks: number[]): NavNode[] {
  const neighbors: NavNode[] = []
  const x = node.nodeX
  const y = node.nodeY
  let directions: number[][] = []
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

export function heuristic(a: NavNode, b: NavNode): number {
  const dx = b.nodeX - a.nodeX
  const dy = b.nodeY - a.nodeY
  return Math.sqrt(dx * dx + dy * dy)
}
