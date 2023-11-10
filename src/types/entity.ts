import { Bounds } from './bounds';

export interface Entity extends Bounds {
    update(delta: number): void;
}
