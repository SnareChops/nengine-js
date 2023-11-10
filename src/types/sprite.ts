import { Bounds } from './bounds';
import { Image } from '../image';

/**
 * Implement this interface to form a "sprite" that
 * the renderer can draw automatically
 */
export interface Sprite extends Bounds {
    image(): Image;
}