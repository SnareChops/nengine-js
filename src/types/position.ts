import { Vector } from './vector';

/**
 * Position represents a point or coordinate
 */
export interface Position {
    pos(): Vector;
    pos2(): [x: number, y: number];
    setPos2(x: number, y: number): void;
    pos3(): [x: number, y: number, z: number];
    setPos3(x: number, y: number, z: number): void;
    gridAlign(h: number, v: number): void;
    x(x?: number): number;
    y(y?: number): number;
    z(z?: number): number;
    xy(x?: number, y?: number): [x: number, y: number];
    yz(y?: number, z?: number): [y: number, z: number];
    xz(x?: number, z?: number): [x: number, z: number];
    xyz(x?: number, y?: number, z?: number): [x: number, y: number, z: number];
}