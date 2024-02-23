import { Bounds, RawBounds } from '.';

export interface Rect {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

export function combineRects(rects: Rect[]): Rect[] {
    // Combine horizontally
    for (const a of rects) {
        for (const [i, b] of rects.entries()) {
            // Skip a == b
            if (a === b) continue;

            // If a is the same height as b
            // and a is at the same y value as b
            // and b is touching the left side of a
            if (a.minY === b.minY && a.maxY == b.maxY && a.maxX == b.minX) {
                a.maxX = b.maxX;
                rects.splice(i, 1);
            }
        }
    }

    // Combine vertically
    for (const a of rects) {
        for (const [i, b] of rects.entries()) {
            // Skip a == b
            if (a === b) continue;

            // If a is same width as b
            // and a is at same x value as b
            // and b is touching the bottom of a
            if (a.minX === b.minX && a.maxX === b.maxX && a.maxY === b.minY) {
                a.maxY = b.maxY;
                rects.splice(i, 1);
            }
        }
    }
    return rects;
}

export function rectsToBounds(rects: Rect[]): Bounds[] {
    const out: Bounds[] = [];
    for (const rect of rects) {
        const bounds = new RawBounds(rect.maxX - rect.minX, rect.maxY - rect.minY);
        bounds.setPos2(rect.minX, rect.minY);
        out.push(bounds);
    }
    return out;
}