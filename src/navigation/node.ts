import { Point } from '../bounds/point';
import { Position } from '../types';

/** Represents a path of navigation points */
export type NavPath = Position[];

/** Represents a node in the NavMesh */
export class NavNode extends Point {
    nodeX: number = 0;
    nodeY: number = 0;
    f: number = 0;
    g: number = 0;
    h: number = 0;
    parent: NavNode | undefined;
    index: number = 0;

    constructor(x: number, y: number, nodeX: number, nodeY: number, g: number, index: number) {
        super(x, y);
        this.nodeX = nodeX;
        this.nodeY = nodeY;
        this.g = g;
        this.index = index;
    }
}