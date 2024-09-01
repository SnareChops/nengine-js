import { Box } from './box.js'
import type { Position } from '../types/index.js'

export class Raw extends Box {

  static fromPoints(a: Position, b: Position): Raw {
    const x1 = Math.min(a.x(), b.x())
    const y1 = Math.min(a.y(), b.y())
    const x2 = Math.max(a.x(), b.x())
    const y2 = Math.max(a.y(), b.y())
    const raw = new Raw(x2 - x1, y2 - y1)
    raw.setPos2(x1, y1)
    return raw
  }
}
