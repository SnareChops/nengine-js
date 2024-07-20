import { createCanvas } from '../image.js'
/**
 *
 * @param {import('../image.js').Image} img
 * @param {number} size
 * @returns {import('../types/index.js').ImageChunk[]}
 */
export function chunkImage(img, size) {
  // Obtain the size of the image
  const width = img.width
  const height = img.height
  /** @type {import('../types/index.js').ImageChunk[]} */
  const newImages = []
  // Loop over the image by segments of 4000px
  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      /** @type {number} */
      let subWidth
      /** @type {number} */
      let subHeight

      if (x + size > width) subWidth = width - x
      else subWidth = size

      if (y + size > height) subHeight = height - y
      else subHeight = size

      const [subImg, context] = createCanvas(subWidth, subHeight)

      // Draw the sub-image onto the new image
      context.drawImage(img, -x, -y)

      // Add the new image to the slice
      newImages.push({
        x,
        y,
        width: subWidth,
        height: subHeight,
        image: subImg,
      })
    }
  }
  return newImages
}
