import { panic } from './panic.js'
/**
 * Represents an image that can be drawn
 * @typedef {HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas} Image
 */
/**
 * Represents a canvas context that can be drawn to
 * @typedef {CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D} Context
 */
/**
 * Creates an offscreen canvas for drawing
 * @param {number} w
 * @param {number} h
 * @param {boolean} willReadFrequently
 * @returns {[OffscreenCanvas, OffscreenCanvasRenderingContext2D]}
 */
export function createCanvas(w, h, willReadFrequently = false) {
  const canvas = new OffscreenCanvas(w, h)
  const context = canvas.getContext('2d', { willReadFrequently })
  if (!context) {
    throw panic('Unable to create OffscreenCanvasRenderingContext2D')
  }
  return [canvas, context]
}
