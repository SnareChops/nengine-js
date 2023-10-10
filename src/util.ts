export function isSet(mask: number, state: number): boolean {
    return (mask & state) === state;
}

export function createCanvas(w: number, h: number, willReadFrequently = false): [HTMLCanvasElement, CanvasRenderingContext2D] {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = w;
    canvas.height = h;
    return [canvas, canvas.getContext('2d', { willReadFrequently }) as CanvasRenderingContext2D];
}