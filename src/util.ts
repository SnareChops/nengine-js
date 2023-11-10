import { Bounds } from './types';

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