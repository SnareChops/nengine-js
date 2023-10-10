import * as nengine from '../../src';

export class TestSprite extends nengine.RawBounds {
    #image: CanvasImageSource;
    constructor() {
        super(32, 32);
        this.#image = nengine.imageFromSheet("FloorTiles", 1)!!;
    }

    image(): CanvasImageSource {
        return this.#image;
    }
}