import { Point } from '../bounds/point';
import { Color } from '../color';
import { Context } from '../image';

export function strokeRect(dest: Context, corner1: Point, corner2: Point, width: number, color: Color) {
    const minX = Math.min(corner1.x(), corner2.x());
    const minY = Math.min(corner1.y(), corner2.y());
    const maxX = Math.max(corner1.x(), corner2.x());
    const maxY = Math.max(corner1.y(), corner2.y());
    dest.strokeStyle = color.hex();
    dest.lineWidth = width;
    dest.strokeRect(minX, minY, maxX - minX, maxY - minY);
}