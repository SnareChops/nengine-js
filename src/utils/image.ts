import { createCanvas } from '../types/index.js'
import type { Image, ImageChunk } from '../types/index.js'

export function chunkImage(img: Image, size: number): ImageChunk[] {
  // Obtain the size of the image
  const width = img.width
  const height = img.height
  const newImages: ImageChunk[] = []
  // Loop over the image by segments of 4000px
  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      let subWidth: number
      let subHeight: number

      if (x + size > width) subWidth = width - x
      else subWidth = size

      if (y + size > height) subHeight = height - y
      else subHeight = size

      const context = createCanvas(subWidth, subHeight)

      // Draw the sub-image onto the new image
      context.drawImage(img, -x, -y)

      // Add the new image to the slice
      newImages.push({
        x,
        y,
        width: subWidth,
        height: subHeight,
        image: context.canvas,
      })
    }
  }
  return newImages
}
