/**
 * @param {import('./image.js').Context} ctx
 * @param {import('./image.js').Image} image
 * @param {number} x
 * @param {number} y
 */
export function drawAt(ctx, image, x, y) {
  ctx.drawImage(image, x, y)
}
/**
 * @param {import('./image.js').Context} ctx
 * @param {import('./image.js').Image} cell
 * @param {number} index
 */
export function gridDraw(ctx, cell, index) {
  const width = ctx.canvas.width / cell.width
  const x = Math.floor(index % width)
  const y = Math.floor(index / width)
  ctx.drawImage(cell, x * cell.width, y * cell.height)
}
