import { Bounds } from './bounds';

export interface Camera {
    pos(): [number, number];
    setPos(x: number, y: number): void;
    viewSize(): [number, number];
    worldSize(): [number, number];
    view(): [number, number, number, number];
    zoom(): number;
    setZoom(zoom: number): void;
    cursorWorldPosition(): [number, number];
    worldToScreenPos(x: number, y: number): [number, number];
    screenToWorldPos(x: number, y: number): [number, number];
    follow(target: Bounds): void;
    update(): void;
}