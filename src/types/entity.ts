import { Bounds } from './bounds';

/** Represents an an updatable object with bounds */
export interface Entity extends Bounds {
    update(delta: number): void;
}
