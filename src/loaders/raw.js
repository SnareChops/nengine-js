import { panic } from '../panic.js'
import { createCanvas } from '../image.js'
import { flat, loadImage, sheets } from './image.js'
import { Sheet } from './index.js'

/**
 * @param {string} alias
 * @param {string} url
 * @returns {Promise<void>}
 */
export async function preloadImageRaw(alias, url) {
  if (flat.has(alias)) return
  flat.set(alias, await loadImage(url))
}
/**
 * @param {string} alias
 * @param {string} url
 * @returns {Promise<void>}
 */
export async function preloadSheetRaw(alias, url) {
  if (sheets.has(alias)) return
  const [width, height] = detectSize(url)
  const image = await loadImage(url)
  sheets.set(
    alias,
    new Sheet(
      alias,
      image.width,
      image.height,
      width,
      height,
      slice(image, width, height),
    ),
  )
}
/**
 * @param {string} alias
 * @param {string} url
 * @param {number} cellWidth
 * @param {number} cellHeight
 * @returns {Promise<void>}
 */
export async function preloadSheetManual(alias, url, cellWidth, cellHeight) {
  if (sheets.has(alias)) return
  const image = await loadImage(url)
  sheets.set(
    alias,
    new Sheet(
      alias,
      image.width,
      image.height,
      cellWidth,
      cellHeight,
      slice(image, cellWidth, cellHeight),
    ),
  )
}
/**
 * @param {string} url
 * @returns {[w: number, h: number]}
 */
function detectSize(url) {
  const match = /([a-zA-Z0-9_\/\\]+?)(\d+)x?(\d+)?/.exec(url.toLowerCase())
  if (!match || match.length < 3) {
    throw panic(
      'Unable to detect sheet cell size from url:',
      url,
      'Image sprite sheets must include the cell width and height in the filename. (ex: SpriteSheet32.png or SpriteSheet32x32.jpg)',
    )
  }
  const width = Number(match[2])
  if (isNaN(width)) {
    throw panic('Unexpected error parsing sheet cell size from url:', url)
  }
  let height = width
  if (match.length === 4) {
    const h = Number(match[3])
    if (!isNaN(h)) height = h
  }
  return [width, height]
}
/**
 * @param {import('../image.js').Image} img
 * @param {number} cw
 * @param {number} ch
 * @returns {import('../image.js').Image[]}
 */
function slice(img, cw, ch) {
  /** @type {import('../image.js').Image[]} */
  const images = []
  const cols = img.width / cw
  const rows = img.height / ch
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cw,
        y = row * ch
      const [image, context] = createCanvas(cw, ch)
      context.drawImage(img, x, y, cw, ch, 0, 0, cw, ch)
      images.push(image)
    }
  }
  return images
}
