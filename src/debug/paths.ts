import { Point } from '../bounds/point';
import { Color } from '../color';
import { Context } from '../image';
import { Camera } from '../types/camera';
import { debugEnabled } from './debug';

interface path {
    points: Point[];
    color: Color;
}

let paths = new Map<any, path>();

export function addPath(ptr: any, points: Point[], color: Color) {
    if (!debugEnabled) return;
    if (paths.has(ptr)) return;
    paths.set(ptr, { points, color });
}

export function removePath(ptr: any) {
    if (!debugEnabled) return;
    paths.delete(ptr);
}

export function drawPaths(ctx: Context, camera: Camera) {
    if (!debugEnabled) return;
    for (const path of paths.values()) {
        for (let [i, j] = [0, 1]; j < path.points.length; [i, j] = [i + 1, j + 1]) {
            const [x1, y1] = camera.worldToScreenPos(...path.points[i].xy());
            const [x2, y2] = camera.worldToScreenPos(...path.points[j].xy());
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        }
    }
};

/** Returns the current debug paths */
export function debugPaths(): Map<any, path> {
    return paths;
}