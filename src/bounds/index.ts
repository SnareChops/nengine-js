export * from './bounds';
export { Physics as PhysicsBounds } from './physics';
export { Position } from './position';
export { Raw as RawBounds } from './raw';
export { Relative as RelativeBounds } from './relative';

import { Position, Point as _Point } from './position';
export function Point(x: number, y: number, z: number = 0): Position {
    const point = new _Point();
    point.xyz(x, y, z);
    return point;
}