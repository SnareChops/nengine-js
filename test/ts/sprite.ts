import * as nengine from '../../src';

export class TestSprite extends nengine.RawBounds {
    #image: nengine.Image;
    constructor() {
        super(32, 32);
        this.#image = nengine.getImage('TestIcon')!!;
    }

    image(): nengine.Image {
        return this.#image;
    }
}