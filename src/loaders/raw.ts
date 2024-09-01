import { panic } from '../panic.js'
import { createCanvas } from '../types/index.js'
import type { Image } from '../types/index.js'
import { flat, loadImage, sheets } from './image.js'
import { Sheet } from './index.js'

export async function preloadImageRaw(alias: string, url: string): Promise<void> {
  if (flat.has(alias)) return
  flat.set(alias, await loadImage(url))
}

export async function preloadSheetRaw(alias: string, url: string): Promise<void> {
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

export async function preloadSheetManual(alias: string, url: string, cellWidth: number, cellHeight: number): Promise<void> {
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

function detectSize(url: string): [w: number, h: number] {
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

function slice(img: Image, cw: number, ch: number): Image[] {
  const images: Image[] = []
  const cols = img.width / cw
  const rows = img.height / ch
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cw,
        y = row * ch
      const context = createCanvas(cw, ch)
      context.drawImage(img, x, y, cw, ch, 0, 0, cw, ch)
      images.push(context.canvas)
    }
  }
  return images
}
