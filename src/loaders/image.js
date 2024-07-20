import { panic } from '../panic.js'
import { preloadImageRaw, preloadSheetRaw } from './raw.js'
import { Sheet } from './index.js'

/** @type {Map<string, import('../image.js').Image>} */
export let flat = new Map()
/** @type {Map<string, Sheet>} */
export let sheets = new Map()
/** @type {Map<string, import('../types/index.js').Anim>} */
export let anims = new Map()
/**
 * @param {string} path
 * @returns {string}
 */
function imageType(path) {
  const p = path.toLowerCase()
  if (p.endsWith('.aseprite') || p.endsWith('.ase')) {
    return 'aseprite'
  }
  if (p.endsWith('.png') || p.endsWith('.jpg') || p.endsWith('.jpeg')) {
    return 'raw'
  }
  throw panic('imageType: Unknown image type: ' + path)
}
/**
 * @param {string} alias
 * @param {string} path
 */
export function preloadImage(alias, path) {
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
/**
 * @param {string} alias
 * @param {string} path
 */
export function preloadSheet(alias, path) {
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
/**
 * @param {string} alias
 * @param {string} path
 */
export function preloadAnim(alias, path) {
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
/**
 * @param {string} alias
 * @returns {import('../image.js').Image}
 */
export function getImage(alias) {
  const result = flat.get(alias)
  if (!result) throw panic('GetImage: ' + alias + ' not found in cache')
  return result
}
/**
 * @param {string} alias
 * @returns {Sheet}
 */
export function getSheet(alias) {
  const result = sheets.get(alias)
  if (!result) throw panic('GetSheet: ' + alias + ' not found in cache')
  return result
}
/**
 *
 * @param {string} alias
 * @param {number} index
 * @returns {import('../image.js').Image}
 */
export function getSheetCell(alias, index) {
  const sheet = getSheet(alias)
  if (!sheet) throw panic(`Sheet ${alias} has not been preloaded`)
  if (index < 0 || index >= sheet.cells.length) {
    throw panic('GetSheetCell:' + index + ': ' + alias + ' out of range')
  }
  return sheet.cells[index]
}
/**
 * @param {string} alias
 * @param {number} start
 * @param {number} end
 * @returns {import('../image.js').Image[]}
 */
export function getSheetRange(alias, start, end) {
  const sheet = getSheet(alias)
  if (!sheet) throw panic(`Sheet ${alias} not preloaded`)
  if (start < 0 || end >= sheet.cells.length) {
    throw panic(
      'GetSheetRange:' + start + '-' + end + ': ' + alias + ' out of range',
    )
  }
  return sheet.cells.slice(start, end)
}
/**
 * @param {string} alias
 * @returns {import('../types/index.js').Anim | undefined}
 */
export function getAnim(alias) {
  if (anims.has(alias)) return anims.get(alias)
  throw panic('GetAnim: ' + alias + ' not found in cache')
}
/**
 * @param {string} url
 * @returns {Promise<HTMLImageElement>}
 */
export async function loadImage(url) {
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
