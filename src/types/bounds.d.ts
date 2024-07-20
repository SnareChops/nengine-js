import { Position } from './position.d.ts'
/** 
 * Bounds represents a rectangle
 * Includes useful utilities for working with the bounds
 */
export interface Bounds extends Box {
  /**
   * Gets the normal vector of the provided edge
   * edges: {@link LEFT}, {@link TOP}, {@link RIGHT}, {@link BOTTOM}
   */
  normalVectorOf(edge: number): [x: number, y: number]
}

export interface Box extends Position {
  /** Gets the width,height of the bounds */
  size(): [w: number, h: number]
  /** Sets the width,height of the bounds */
  setSize(w: number, h: number): void
  /** Resizes the bounds */
  resize(w: number, h: number): void
  /** Gets the relative x,y offset of the bounds */
  offset(): [x: number, y: number]
  /** Sets the relative x,y offset of the bounds */
  setOffset(x: number, y: number): void
  /**
   * Sets the horizontal and vertical anchor setting for the bounds 
   * horizontal: {@link LEFT}, {@link RIGHT}, or {@link CENTER}
   * vertical: {@link TOP}, {@link BOTTOM}, or {@link CENTER}
   */
  setAnchor(h: number, v: number): void
  /** Gets the rotation of the bounds (in radians) */
  rotation(): number
  /** Sets the rotation of the bounds (in radians) */
  setRotation(radians: number): void
  /** 
   * Gets the width of the bounds 
   * @alias width
   */
  dx(): number
  /**
   * Gets the height of the bounds 
   * @alias height
   */
  dy(): number
  /**
    * Gets the width of the bounds 
    * @alias dx
    */
  width(): number
  /**
   * Gets the height of the bounds
   * @alias dy 
   */
  height(): number
  /** Gets the minmum absolute x,y position of the bounds */
  min(): [x: number, y: number]
  /** Gets the absolute x,y position at the midpoint of the bounds */
  mid(): [x: number, y: number]
  /** Gets the maximum absolute x,y position of the bounds */
  max(): [x: number, y: number]
  /** Gets the absolute x position at the midpoint of the bounds */
  midX(): number
  /** Gets the absolute y position at the midpoint of the bounds */
  midY(): number
  /** Gets the maximum absolute x position of the bounds */
  maxX(): number
  /** Gets the maximum absolute y position of the bounds */
  maxY(): number
}