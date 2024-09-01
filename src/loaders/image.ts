import { panic } from '../panic.js'
import { preloadImageRaw, preloadSheetRaw } from './raw.js'
import { Sheet } from './index.js'
import type { Anim, Image as Img } from '../types/index.js'

export let flat = new Map<string, Img>()
export let sheets = new Map<string, Sheet>()
export let anims = new Map<string, Anim>()

function imageType(path: string): string {
  const p = path.toLowerCase()
  if (p.endsWith('.aseprite') || p.endsWith('.ase')) {
    return 'aseprite'
  }
  if (p.endsWith('.png') || p.endsWith('.jpg') || p.endsWith('.jpeg')) {
    return 'raw'
  }
  throw panic('imageType: Unknown image type: ' + path)
}

export function preloadImage(alias: string, path: string) {
  switch (imageType(path)) {
    case 'aseprite':
      throw panic('preloadImage: Aseprite not yet implemented')
    // return preloadImageAseprite(alias, path);
    case 'raw':
      return preloadImageRaw(alias, path)
    default:
      throw panic('PreloadImage: Unsupported image type' + alias)
  }
}

export function preloadSheet(alias: string, path: string) {
  switch (imageType(path)) {
    case 'aseprite':
      throw panic('preloadSheet: Aseprite not yet implemented')
    // return preloadSheetAseprite(alias, path);
    case 'raw':
      return preloadSheetRaw(alias, path)
    default:
      throw panic('PreloadSheet: Unsupported image type' + alias)
  }
}

export function preloadAnim(alias: string, path: string) {
  switch (imageType(path)) {
    case 'aseprite':
      throw panic('preloadAnim: Aseprite not yet implemented')
    // return preloadAnimAseprite(alias, path);
    case 'raw':
      throw panic(
        'PreloadAnim: PNG not supported for animations. Use PreloadSheet instead.',
      )
    default:
      throw panic('PreloadAnim: Unsupported image type' + alias)
  }
}

export function getImage(alias: string) {
  const result = flat.get(alias)
  if (!result) throw panic('GetImage: ' + alias + ' not found in cache')
  return result
}

export function getSheet(alias: string): Sheet {
  const result = sheets.get(alias)
  if (!result) throw panic('GetSheet: ' + alias + ' not found in cache')
  return result
}

export function getSheetCell(alias: string, index: number): Img {
  const sheet = getSheet(alias)
  if (!sheet) throw panic(`Sheet ${alias} has not been preloaded`)
  if (index < 0 || index >= sheet.cells.length) {
    throw panic('GetSheetCell:' + index + ': ' + alias + ' out of range')
  }
  return sheet.cells[index]
}

export function getSheetRange(alias: string, start: number, end: number): Img[] {
  const sheet = getSheet(alias)
  if (!sheet) throw panic(`Sheet ${alias} not preloaded`)
  if (start < 0 || end >= sheet.cells.length) {
    throw panic(
      'GetSheetRange:' + start + '-' + end + ': ' + alias + ' out of range',
    )
  }
  return sheet.cells.slice(start, end)
}

export function getAnim(alias: string): Anim | undefined {
  if (anims.has(alias)) return anims.get(alias)
  throw panic('GetAnim: ' + alias + ' not found in cache')
}

export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = url
    image.onerror = (event, source, lineno, colno, err) => {
      panic('Error loading image', err, `${source}:${lineno}:${colno}`, event)
      resolve(new Image())
    }
    // @ts-expect-error
    image.addEventListener('load', (event) => resolve(event.target))
  })
}
