import { Point } from './bounds';
import { Image } from './image';
import { Bounds, Position } from './types';

/** Floors a number ensuring it is a whole integer */
export function int(n: number): number {
    return Math.floor(n);
}

/** Floors two number ensuing they are whole integers */
export function ints(a: number, b: number): [c: number, d: number] {
    return [int(a), int(b)];
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
/** Scale and fit an image to a new image */
export function fitToNewImage(w: number, h: number, image: Image): Image {
    const [canvas, ctx] = createCanvas(w, h);
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, w, h);
    return canvas;
}

export function gridPointsAroundBounds(bounds: Bounds, gridWidth: number, gridHeight: number): Position[] {
    // Snap top left of bounds to grid
    const pos = Point(...bounds.min());
    pos.gridAlign(gridWidth, gridHeight);
    // Then add half grid width and height to get the center
    pos.setPos2(pos.x() + gridWidth / 2, pos.y() + gridHeight / 2);
    // Check if this point is inside the bounds
    if (bounds.isWithin(...pos.pos2()))
        // If so, subtract full grid cell
        pos.setPos2(pos.x() - gridWidth, pos.y() - gridHeight);

    const points: Position[] = [pos];
    const timesWidth = bounds.dx() / gridWidth;
    const timesHeight = bounds.dy() / gridHeight;
    // Walk around bounds at grid cell intervals creating points
    for (let i = 0; i < timesWidth; i++) {
        const last = points[points.length - 1];
        const pos = Point(last.x() + gridWidth, last.y());
        points.push(pos);
    }

    points.push(Point(points[points.length - 1].x() + gridWidth, points[points.length - 1].y()));
    for (let i = 0; i < timesHeight; i++) {
        const last = points[points.length - 1];
        const pos = Point(last.x(), last.y() + gridHeight);
        points.push(pos);
    }

    points.push(Point(points[points.length - 1].x(), points[points.length - 1].y() + gridHeight));
    for (let i = 0; i < timesWidth; i++) {
        const last = points[points.length - 1];
        const pos = Point(last.x() - gridWidth, last.y());
        points.push(pos);
    }

    points.push(Point(points[points.length - 1].x() - gridWidth, points[points.length - 1].y()));
    for (let i = 0; i < timesHeight; i++) {
        const last = points[points.length - 1];
        const pos = Point(last.x(), last.y() - gridHeight);
        points.push(pos);
    }
    return points;
}