import { Color } from '../color.js'
import type { Camera, Context, Position } from '../types/index.js'

export interface path {
  points: Position[]
  color: Color
}

let paths = new Map<any, path>()

export function addPath(ptr: any, points: Position[], color: Color) {
  if (paths.has(ptr)) return
  paths.set(ptr, { points, color })
}

export function removePath(ptr: any) {
  paths.delete(ptr)
}

export function drawPaths(ctx: Context, camera: Camera) {
  for (const path of paths.values()) {
    for (let [i, j] = [0, 1]; j < path.points.length; [i, j] = [i + 1, j + 1]) {
      const [x1, y1] = camera.worldToScreenPos(...path.points[i].xy())
      const [x2, y2] = camera.worldToScreenPos(...path.points[j].xy())
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
    }
  }
}
