import { Bounds, RawBounds } from '../bounds';
/**
 *  ChunkBounds returns a list of bounds split from the original bounds
 * using the maximum provided size
 * Note: This is usually used to facilitate splitting a large Bounds or image
 * into smaller pieces so that it can be used by the Renderer
 */
export function chunkBounds(original: Bounds, size: number): Bounds[] {
    const out: Bounds[] = [];
    const [x, y] = original.xy();
    const [width, height] = original.size();
    for (let i = 0; i < width; i += size) {
        for (let j = 0; j < height; j += size) {
            let w: number = 0;
            let h: number = 0;
            if (i + size > width) w = width - i;
            else w = size;

            if (j + size > height) h = height - j;
            else h = size;

            const bounds = new RawBounds(w, h);
            bounds.xy(x + i, y + j);
            out.push(bounds);
        }
    }
    return out;
}