import { Bounds } from './types';

export function int(n: number): number {
    return Math.floor(n);
}

export function ints(a: number, b: number): [c: number, d: number] {
    return [int(a), int(b)];
}

/** Checks if a bit in a bitmask is set */
export function isSet(mask: number, state: number): boolean {
    return (mask & state) === state;
}
/** Creates an offscreen canvas for drawing */
export function createCanvas(w: number, h: number, willReadFrequently = false): [OffscreenCanvas, OffscreenCanvasRenderingContext2D] {
    const canvas = new OffscreenCanvas(w, h);
    return [canvas, canvas.getContext('2d', { willReadFrequently }) as OffscreenCanvasRenderingContext2D];
}
/** Transforms a coordinate to a relative coordinate within the bounds */
export function relativePosition(x: number, y: number, bounds: Bounds): [number, number] {
    const [bx, by] = bounds.min();
    return [x - bx, y - by];
}
interface VerticalRelative {
    pos2(): [x: number, y: number];
    dy(): number;
}
/** 
 * Gets the x, y coordinate directly below the provided object
 * Useful for positioning things relative to each other
 * Padding is the space that should be added to the y coordinate
 * Note: X will be the same as the object's X
 */
export function positionBelow(object: VerticalRelative, padding: number): [x: number, y: number] {
    const [x, y] = object.pos2();
    return [x, y + object.dy() + padding];
}

interface HorizontalRelative {
    pos2(): [x: number, y: number];
    dx(): number;
}
/** 
 * Gets the x, y coordinate directly to the right of the provided
 * object.
 * Useful for positioning things relative to eachother
 * Padding is the space that should be added the the x coordinate
 * Note: Y will be the same as the object's Y
 */
export function positionRight(object: HorizontalRelative, padding: number): [x: number, y: number] {
    const [x, y] = object.pos2();
    return [x + object.dx() + padding, y];
}