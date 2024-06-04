import assert from '../../test/assert';
import { Vector } from './vector';

export function testVectorAdd() {
    let v = new Vector(0, 0).add(new Vector(0, 0));
    assert.equal(0, v.X);
    assert.equal(0, v.Y);

    v = new Vector(1, 2).add(new Vector(3, 4));
    assert.equal(4, v.X);
    assert.equal(6, v.Y);
}

export function testVectorSub() {
    let v = new Vector(0, 0).sub(new Vector(0, 0));
    assert.equal(0, v.X);
    assert.equal(0, v.Y);

    v = new Vector(3, 4).sub(new Vector(1, 2));
    assert.equal(2, v.X);
    assert.equal(2, v.Y);

    v = new Vector(1, 2).sub(new Vector(3, 4));
    assert.equal(-2, v.X);
    assert.equal(-2, v.Y);
}

export function testVectorNormalize() {
    let v = new Vector(0, 0).normalize();
    assert.equal(0, v.X);
    assert.equal(0, v.Y);
}