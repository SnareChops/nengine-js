import { Image } from '../image';
import { Bounds } from './bounds';

/**
 * Implement this interface to form a "sprite" that
 * the renderer can draw automatically
 */
export interface Sprite extends Bounds {
    image(): Image | undefined;
}

export interface SpriteSource {
    url(): string;
    index(): number;
    image(): Image;
}