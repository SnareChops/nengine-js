import { Position } from '../types/position';

/** Gets the distance between two given positions */
export function distanceBetween(start: Position, end: Position): number {
    return distanceBetweenPoints(...start.xy(), ...end.xy());
}
/** Gets the distance between two given sets of points */
export function distanceBetweenPoints(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
/** 
 * Gets the x,y position from the given x,y position
 * at the given distance away along the given angle
 */
export function pointAtAngleWithDistance(x: number, y: number, angle: number, dist: number): [x: number, y: number] {
    return [
        x + dist * Math.cos(angle),
        y + dist * Math.sin(angle),
    ];
}

/** Gets the angle from point a to point b */
export function angleBetween(a: Position, b: Position): number {
    return angleBetweenPoints(...a.xy(), ...b.xy());
}

/** Gets the angle (in radians) between two points */
export function angleBetweenPoints(x1: number, y1: number, x2: number, y2: number): number {
    const result = Math.atan2(y2 - y1, x2 - x1);
    if (result < 0) {
        return result + 2 * Math.PI;
    }
    return result;
}
/** Returns the point on a line between two points at the given percentage */
export function lerp(x1: number, y1: number, x2: number, y2: number, percent: number): [number, number] {
    return [x1 + (x2 - x1) * percent, y1 + (y2 - y1) * percent];
}
/** Returns the value at a given percentage from a to b */
export function linearInterpolate(a: number, b: number, percent: number): number {
    return a + (b - a) * percent;
}
/** Normalizes a vector */
export function normalizeVector(x: number, y: number): [x: number, y: number] {
    const length = Math.sqrt(x * x + y * y);
    if (length == 0) {
        return [0, 0];
    }
    return [x / length, y / length];
}
/** Gets the normal vector of a line */
export function normalVector(x1: number, y1: number, x2: number, y2: number): [x: number, y: number] {
    return [-(y2 - y1), x2 - x1];
}
/** Translates a number in a given range, to the same value in a different range */
export function translateNumberBetweenRanges(value: number, minA: number, maxA: number, minB: number, maxB: number): number {
    return (value - minA) / (maxA - minA) * (maxB - minB) + minB;
}
/** Returns the provided number, keeping it in the provided range */
export function clamp(num: number, min: number, max: number): number {
    if (num < min) {
        return min;
    }
    if (num > max) {
        return max;
    }
    return num;
}

export function moveTowards(start: Position, end: Position, speed: number, delta: number): [x: number, y: number] {
    const length = speed / delta;
    const dist = distanceBetween(start, end);
    if (dist <= length) return end.xy();
    const angle = angleBetween(start, end);
    return pointAtAngleWithDistance(...start.xy(), angle, length);
}

export function exponentialDecay(a: number, b: number, decay: number, delta: number): number {
    return a + (a - b) * Math.exp(-decay * delta); // seconds
}