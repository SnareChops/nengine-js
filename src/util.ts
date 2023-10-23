export function isSet(mask: number, state: number): boolean {
    return (mask & state) === state;
}

export function createCanvas(w: number, h: number, willReadFrequently = false): [OffscreenCanvas, OffscreenCanvasRenderingContext2D] {
    const canvas = new OffscreenCanvas(w, h);
    return [canvas, canvas.getContext('2d', { willReadFrequently }) as OffscreenCanvasRenderingContext2D];
}