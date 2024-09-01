import { distanceBetweenPoints, isWithin } from '../utils/index.js'
import { NavNode } from './node.js'
import { PriorityQueue } from './queue.js'
import { getNeighbors, heuristic, matchesMasks } from './utils.js'
import type { Box, Position, NavPath } from '../types/index.js'

/** NavMesh represents a navigation grid for pathfinding */
export class NavMesh {
  #grid: NavNode[][] = []
  #navGroups: number = 0
  #group: number = 0
  #active: number = 0
  #hspacing: number = 0
  #vspacing: number = 0
  #hoffset: number = 0
  #voffset: number = 0

  static initSimple(width: number, height: number): NavMesh {
    const mesh = Object.create(NavMesh.prototype)
    const grid: NavNode[][] = new Array(width)
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(height)
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = new NavNode(i, j, i, j, Number.POSITIVE_INFINITY, -1)
      }
    }
    mesh.#navGroups = 10
    mesh.#grid = grid
    return mesh
  }

  constructor(width: number, height: number, hspacing: number, vspacing: number, hoffset: number, voffset: number) {
    this.#hspacing = hspacing
    this.#vspacing = vspacing
    this.#hoffset = hoffset
    this.#voffset = voffset
    let xCount = 0
    if (hspacing == 0 && hoffset == 0) {
      xCount = width
    } else {
      xCount = Math.ceil((width - hoffset) / hspacing)
    }
    let yCount = 0
    if (vspacing == 0 && voffset == 0) {
      yCount = height
    } else {
      yCount = Math.ceil((height - voffset) / vspacing)
    }
    const grid: NavNode[][] = new Array(xCount)
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(yCount)
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = new NavNode(
          i * hspacing + hoffset,
          j * vspacing + voffset,
          i,
          j,
          Number.POSITIVE_INFINITY,
          -1,
        )
      }
    }
    this.#navGroups = 10
    this.#grid = grid
  }
  /** Returns the nav nodes in the grid */
  grid(): NavNode[][] {
    return this.#grid
  }
  /** Increments and returns the next nav group number */
  nextNavGroup(): number {
    this.#group += 1
    if (this.#group >= this.#navGroups) {
      this.#group = 0
    }
    return this.#group
  }
  /** Returns the nav group that is active this frame */
  activeNavGroup(): number {
    return this.#active
  }
  /** Sets the mask on the node at the provided index position */
  maskNode(i: number, j: number, mask: number) {
    this.#grid[i][j].mask = mask
  }
  /** Sets the mask on the node at the provided world position */
  maskNodeAt(x: number, y: number, mask: number) {
    const i = Math.floor(x * this.#hspacing + this.#hoffset)
    const j = Math.floor(y * this.#vspacing + this.#voffset)
    this.#grid[i][j].mask = mask
  }
  /** Sets the mask on the nodes that collide with the provided box */
  maskNodesWithin(box: Box, mask: number) {
    for (const x of this.#grid.keys()) {
      for (const y of this.#grid[x].keys()) {
        if (
          this.#grid[x][y] &&
          isWithin(
            box,
            x * this.#hspacing + this.#hoffset,
            y * this.#vspacing + this.#voffset,
          )
        ) {
          this.#grid[x][y].mask = mask
        }
      }
    }
  }
  /** Updates the state of the nav mesh */
  update() {
    this.#active += 1
    if (this.#active >= this.#navGroups) {
      this.#active = 0
    }
  }

  closestNode(pos: Position, ...masks: number[]) {
    const x = Math.floor((pos.x() - this.#hoffset) / this.#hspacing)
    const y = Math.floor((pos.y() - this.#voffset) / this.#vspacing)
    let min = Number.MAX_VALUE

    let closest: NavNode | undefined
    let iteration = 1
    while (true) {
      for (let i = 0; i < 2 * iteration; i++) {
        for (let j = 0; j < 2 * iteration; j++) {
          if (!matchesMasks(this.#grid[i + x][j + y], masks)) {
            continue
          }
          const gridPos = this.#grid[i + x][j + y].pos()
          const dist = distanceBetweenPoints(
            pos.x() - this.#hspacing * (iteration - 1),
            pos.y() - this.#vspacing * (iteration - 1),
            gridPos.x(),
            gridPos.y(),
          )
          if (dist < min) {
            min = dist
            closest = this.#grid[i + x][j + y]
          }
        }
      }
      if (closest) break
      iteration += 1
    }
    return closest
  }
  /**
   * Pathfind uses the NavMesh to find a path from the start to end position
   * optionally allowing diagonal movement between the nodes
   */
  pathfind(start: Position, end: Position, allowDiagonals: boolean, ...masks: number[]): NavPath {
    const startNode = this.closestNode(start, ...masks)
    const endNode = this.closestNode(end, ...masks)
    // @ts-ignore
    const path = this.astar(startNode, endNode, allowDiagonals, ...masks)
    if (path.length > 0) {
      path.push(end)
      return path.slice(1)
    }
    return []
  }
  /**
   * AStar runs the A* algorithm on the NavMesh and returns a path between the
   * provided nodes, optionally allowing diagonal movement between nodes.
   * Note: This is exposed, but is really only intended to be used internally.
   * Prefer using the pathfind() method instead.
   */
  astar(start: NavNode, end: NavNode, allowDiagonals: boolean, ...masks: number[]): NavPath {
    const openSet: PriorityQueue<NavNode> = new PriorityQueue()
    const closedSet = new Map<NavNode, boolean>()
    start.g = 0
    start.h = heuristic(start, end)
    start.f = start.g + start.h
    openSet.push(start)
    while (openSet.size() > 0) {
      let current: NavNode | undefined = openSet.pop()
      if (current === end) {
        const path: Position[] = []
        while (current != void 0) {
          path.unshift(current)
          current = current.parent
        }
        this.reset()
        return path
      }
      closedSet.set(current, true)
      for (const neighbor of getNeighbors(
        current,
        this.#grid,
        allowDiagonals,
        masks,
      )) {
        if (closedSet.has(neighbor)) continue

        const tentativeGScore = current.g + heuristic(current, neighbor)
        if (tentativeGScore < neighbor.g) {
          neighbor.parent = current
          neighbor.g = tentativeGScore
          neighbor.h = heuristic(neighbor, end)
          neighbor.f = neighbor.g + neighbor.h
          if (neighbor.index >= 0) {
            openSet.fix(neighbor.index)
          } else {
            openSet.push(neighbor)
          }
        }
      }
    }
    this.reset()
    return []
  }
  /** Resets the state of the NavMesh */
  reset() {
    for (let i = 0; i < this.#grid.length; i++) {
      for (let j = 0; j < this.#grid[i].length; j++) {
        const node = this.#grid[i][j]
        if (!node) continue
        node.parent = void 0
        node.f = 0
        node.g = Number.POSITIVE_INFINITY
        node.h = 0
        node.index = -1
      }
    }
  }
}
