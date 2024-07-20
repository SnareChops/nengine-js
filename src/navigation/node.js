import { Position } from '../bounds/position.js'

/**
 * Represents a path of navigation points
 * @typedef {import('../types/index.js').Position[]} NavPath
 */

/** Represents a node in the NavMesh */
export class NavNode extends Position {
  /** @type {number} */
  nodeX = 0
  /** @type {number} */
  nodeY = 0
  /** @type {number} */
  f = 0
  /** @type {number} */
  g = 0
  /** @type {number} */
  h = 0
  /** @type {NavNode | undefined} */
  parent
  /** @type {number} */
  index = 0
  /** @type {number} */
  mask = 0
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} nodeX
   * @param {number} nodeY
   * @param {number} g
   * @param {number} index
   */
  constructor(x, y, nodeX, nodeY, g, index) {
    super(x, y)
    this.nodeX = nodeX
    this.nodeY = nodeY
    this.g = g
    this.index = index
  }
}
