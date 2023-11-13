import { createCanvas } from '../util';
import { Image } from '../image';

/**
 * ImageChunk represents a chunk of an image that
 * can be reassembled to the full image again
 * Note: This is usually used to split a large image into
 * smaller pieces so it can be consumed by the Renderer
 */
export interface ImageChunk {
    x: number;
    y: number;
    width: number;
    height: number;
    image: OffscreenCanvas;
}

export function chunkImage(img: Image, size: number): ImageChunk[] {
    // Obtain the size of the image
    const width = img.width;
    const height = img.height;

    const newImages: ImageChunk[] = [];
    // Loop over the image by segments of 4000px
    for (let y = 0; y < height; y += size) {
        for (let x = 0; x < width; x += size) {
            let subWidth, subHeight: number;

            if (x + size > width) subWidth = width - x;
            else subWidth = size;

            if (y + size > height) subHeight = height - y;
            else subHeight = size;

            const [subImg, context] = createCanvas(subWidth, subHeight);

            // Draw the sub-image onto the new image
            context.drawImage(img, -x, -y);

            // Add the new image to the slice
            newImages.push({
                x,
                y,
                width: subWidth,
                height: subHeight,
                image: subImg,
            });
        }
    }
    return newImages;
}
