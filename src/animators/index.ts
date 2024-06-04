import { Image } from '../image';

/** Represents an animator */
export interface Animator {
    start(name: string): void;
    update(delta: number): void;
    image(): Image;
}
