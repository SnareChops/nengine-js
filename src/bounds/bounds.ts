import { Position } from './position';

export const TOP = 0;
export const CENTER = 1;
export const BOTTOM = 2;
export const LEFT = 3;
export const RIGHT = 4;

/** 
 * Bounds represents a rectangle
 * Includes useful utilities for working with the bounds
 */
export interface Bounds extends Position {
    /**
     * Gets the absolute x,y position of the provided anchor point
     * horizontal: {@link LEFT}, {@link RIGHT}, {@link CENTER}
     * vertical: {@link TOP}, {@link BOTTOM}, {@link CENTER}
    */
    posOf(h: number, v: number): [x: number, y: number];
    /** Gets the absolute x,y position of the top left corner of the bounds */
    rawPos(): [x: number, y: number];
    /**
     * Sets the horizontal and vertical anchor setting for the bounds 
     * horizontal: {@link LEFT}, {@link RIGHT}, or {@link CENTER}
     * vertical: {@link TOP}, {@link BOTTOM}, or {@link CENTER}
     */
    setAnchor(h: number, v: number);
    /** Gets the relative x,y offset of the bounds */
    offset(): [x: number, y: number];
    /** Sets the relative x,y offset of the bounds */
    setOffset(x: number, y: number);
    /** Gets the width,height of the bounds */
    size(): [width: number, height: number];
    /** Sets the width,height of the bounds */
    setSize(w: number, h: number);
    /**
     * Gets the width of the bounds 
     * @alias dx
     */
    width(): number;
    /**
     * Gets the height of the bounds
     * @alias dy 
     */
    height(): number;
    /** Gets the width of the bounds */
    dx(): number;
    /** Gets the height of the bounds */
    dy(): number;
    /** Gets the rotation of the bounds (in radians) */
    rotation(): number;
    /** Sets the rotation of the bounds (in radians) */
    setRotation(radians: number);
    /** Gets the scale of the bounds, as float percentage */
    scale(): number;
    /** Sets the scale of the bounds, as float percentage */
    setScale(scale: number);
    /**
     * Scales the bounds to fit within the provided width,height
     * returns the actual width,height after scaling
     */
    scaleTo(w: number, h: number): [width: number, height: number];
    /** Gets the minmum absolute x,y position of the bounds */
    min(): [x: number, y: number];
    /** Gets the absolute x,y position at the midpoint of the bounds */
    mid(): [x: number, y: number];
    /** Gets the maximum absolute x,y position of the bounds */
    max(): [x: number, y: number];
    /** Checks if the provided x,y position is within the bounds */
    isWithin(x: number, y: number): boolean;
    /**
     * Gets the normal vector of the provided edge
     * edges: {@link LEFT}, {@link TOP}, {@link RIGHT}, {@link BOTTOM}
     */
    normalVectorOf(edge: number): [x: number, y: number];
    /** Checks if the provided bounds overlaps (touches) this bounds */
    doesCollide(Bounds): boolean

    /** @deprecated use posOf() instead */
    vecOf(h: number, v: number): [x: number, y: number];
}