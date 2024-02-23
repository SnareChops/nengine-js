export function scaleFactor(fromWidth: number, fromHeight: number, toWidth: number, toHeight: number): [number, number] {
    return [fromWidth / toWidth, fromHeight / toHeight];
}