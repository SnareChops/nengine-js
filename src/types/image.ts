import { panic } from '../panic.js'

/** Represents an image that can be drawn */
export type Image = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas
/** Represents a canvas context that can be drawn to */
export type Context = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
/** Creates an offscreen canvas for drawing */
export function createCanvas(w: number, h: number, willReadFrequently: boolean = false): OffscreenCanvasRenderingContext2D {
  const canvas = new OffscreenCanvas(w, h)
  const context = canvas.getContext('2d', { willReadFrequently })
  if (!context) {
    throw panic('Unable to create OffscreenCanvasRenderingContext2D')
  }
  return context
}
