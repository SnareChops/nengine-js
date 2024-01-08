import type { Image } from '../image';
import { panic } from '../panic';

const imageCache = new Map<string, Image>();

export function reloadCache(): void {
    imageCache.clear();
}

/**
 * Adds an image from a url to the image cache with the provided url
 * 
 * Due to the async nature of this function, it is recommended to do this
 * before starting the engine, or in the `init()` function of your Game class
 * 
 * PanicMode: This promise will panic if an error occurs while attempting
 * to load an image.
 * 
 * NormalMode: This promise skip adding this image to the cache if an error
 * occurs while attempting to load the image. No indication of the failure
 * will be reported, and later when attempting to retrieve the image, undefined
 * will be returned instead
 */
export async function addImage(url: string): Promise<void> {
    const image = await loadImage(url);
    if (!!image) imageCache.set(url, image);
}
/** Gets an image from the cache */
export function getImage(url: string): Image | undefined {
    if (imageCache.has(url))
        return imageCache.get(url);
}
/**
 * Loads an image from a url.
 * 
 * PanicMode: This promise will panic if an error occurs while attempting
 * to load an image.
 * 
 * NormalMode: This promise will return `undefined` if an error occurs while
 * attempting to load an image.
 */
export async function loadImage(url: string): Promise<HTMLImageElement | undefined> {
    return new Promise(resolve => {
        const image = new Image();
        image.src = url;
        image.onerror = (event, source, lineno, colno, err) => {
            panic('Error loading image', err, `${source}:${lineno}:${colno}`, event);
            resolve(void 0);
        };
        image.addEventListener('load', event => resolve(event.target as HTMLImageElement));
    });
}

export class ImageSource {
    #url: string;

    constructor(url: string) {
        this.#url = url;
    }

    url(): string {
        return this.#url;
    }

    image(): Image | undefined {
        return getImage(this.#url);
    }
}
