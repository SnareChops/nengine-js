/**
 * ImageChunk represents a chunk of an image that
 * can be reassembled to the full image again
 * Note: This is usually used to split a large image into
 * smaller pieces so it can be consumed by the Renderer
 */
export interface ImageChunk {
  x: number
  y: number
  width: number
  height: number
  image: OffscreenCanvas
}