import { NavNode } from '../navigation/node.js'
import { Position } from './position.js'

export interface Navigation {
  pathfind(start: Position, end: Position, allowDiagonals: boolean): NavPath
  grid(): NavNode[][]
  nextNavGroup(): number
  activeNavGroup(): number
  update(): number
}
/** Represents a path of navigation points */
export type NavPath = Position[]
