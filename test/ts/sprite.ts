import * as nengine from '../../src';

export class TestSprite extends nengine.RawBounds {
    #image: nengine.Image;
    constructor() {
        super(32, 32);
        this.#image = nengine.imageFromSheet("FloorTiles", 1)!!;
    }

    image(): nengine.Image {
        return this.#image;
    }
}