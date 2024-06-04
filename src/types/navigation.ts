import { NavNode, NavPath } from '../navigation/node';
import { Position } from './position';

export interface Navigation {
    pathfind(start: Position, end: Position, allowDiagonals: boolean): NavPath;
    grid(): NavNode[][];
    nextNavGroup(): number;
    activeNavGroup(): number;
    update(): number;
}