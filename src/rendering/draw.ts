import type { Image, Context } from '../types/index.js'

export function drawAt(ctx: Context, image: Image, x: number, y: number) {
  ctx.drawImage(image, x, y)
}

export function gridDraw(ctx: Context, cell: Image, index: number) {
  const width = ctx.canvas.width / cell.width
  const x = Math.floor(index % width)
  const y = Math.floor(index / width)
  ctx.drawImage(cell, x * cell.width, y * cell.height)
}
