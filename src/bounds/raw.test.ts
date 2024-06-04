import assert from '../../test/assert';
import { BOTTOM, CENTER, LEFT, RIGHT, TOP } from './bounds';
import { Raw } from './raw';

export function testBoundsOffset() {
    let result = new Raw(2, 4);
    {
        result.setAnchor(LEFT, TOP);
        const [x, y] = result.offset();
        assert.equal(0, x);
        assert.equal(0, y);
    }
    {
        result.setAnchor(CENTER, CENTER);
        const [x, y] = result.offset();
        assert.equal(1, x);
        assert.equal(2, y);
    }
    {
        result.setAnchor(RIGHT, BOTTOM);
        const [x, y] = result.offset();
        assert.equal(2, x);
        assert.equal(4, y);
    }
}

export function testBoundsScale() {
    const result = new Raw(200, 300);
    result.setScale(2.3, 4.5);
    const [x, y] = result.scale();
    assert.equal(2.3, x);
    assert.equal(4.5, y);
}

export function testBoundsRotation() {
    const result = new Raw(200, 300);
    result.setRotation(2.3);
    assert.equal(2.3, result.rotation());
}

export function testBoundsSize() {
    let result = new Raw(2, 3);
    assert.equal([2, 3], result.size());

    result = new Raw(2, 3);
    result.setScale(2, 2);
    assert.equal([4, 6], result.size());
}

export function testBoundsIsWithin() {
    let bounds = new Raw(2, 3);
    assert.true(bounds.isWithin(1, 2));
    assert.false(bounds.isWithin(3, 4));
}

export function testBoundsDoesCollide() {
    let bounds1 = new Raw(4, 4);
    let bounds2 = new Raw(4, 4);
    bounds1.setPos2(8, 8);
    bounds2.setPos2(20, 20);
    assert.false(bounds1.doesCollide(bounds2));

    bounds2.setPos2(6, 5);
    assert.true(bounds1.doesCollide(bounds2));

    bounds2.setPos2(5, 6);
    assert.true(bounds1.doesCollide(bounds2));

    bounds2.setPos2(10, 5);
    assert.true(bounds1.doesCollide(bounds2));

    bounds2.setPos2(5, 10);
    assert.true(bounds1.doesCollide(bounds2));

    bounds2.setPos2(7, 7);
    assert.true(bounds1.doesCollide(bounds2));
}

export function testPosOf() {
    let result = new Raw(10, 10);

    assert.equal([0, 0], result.posOf(LEFT, TOP));
    assert.equal([5, 0], result.posOf(CENTER, TOP));
    assert.equal([10, 0], result.posOf(RIGHT, TOP));
    assert.equal([0, 5], result.posOf(LEFT, CENTER));
    assert.equal([5, 5], result.posOf(CENTER, CENTER));
    assert.equal([10, 5], result.posOf(RIGHT, CENTER));
    assert.equal([0, 10], result.posOf(LEFT, BOTTOM));
    assert.equal([5, 10], result.posOf(CENTER, BOTTOM));
    assert.equal([10, 10], result.posOf(RIGHT, BOTTOM));
}

export function testMax() {
    const result = new Raw(10, 10);
    assert.equal([9, 9], result.max());
}

export function testMin() {
    const result = new Raw(10, 10);
    assert.equal([0, 0], result.min());
}

export function testScaleTo() {
    const bounds = new Raw(10, 10);
    bounds.scaleTo(20, 20);
    assert.equal([2, 2], bounds.scale());

    bounds.scaleTo(30, 30);
    assert.equal([3, 3], bounds.scale());

    bounds.scaleTo(20, 10);
    assert.equal([1, 1], bounds.scale());
}

export function testRawResize() {
    const b = new Raw(10, 20);
    b.setPos2(100, 100);
    b.setAnchor(CENTER, CENTER);
    assert.equal(10, b.dx());
    assert.equal(10, b.width());
    assert.equal(20, b.dy());
    assert.equal(20, b.height());
    assert.equal([5, 10], b.offset());
    assert.equal([10, 20], b.size());
    assert.true(b.isWithin(98, 108));
    assert.false(b.isWithin(109, 112));
    assert.equal([95, 90], b.rawPos());
    assert.equal([105, 110], b.posOf(RIGHT, BOTTOM));
    assert.equal([99.5, 99.5], b.mid());
    assert.equal([104, 109], b.max());
    assert.equal(104, b.maxX());
    assert.equal(109, b.maxY());

    b.resize(20, 30);
    assert.equal(20, b.dx());
    assert.equal(20, b.width());
    assert.equal(30, b.dy());
    assert.equal(30, b.height());
    assert.equal([10, 15], b.offset());
    assert.equal([20, 30], b.size());
    assert.true(b.isWithin(98, 108));
    assert.true(b.isWithin(109, 112));
    assert.false(b.isWithin(113, 117));
    assert.equal([90, 85], b.rawPos());
    assert.equal([110, 115], b.posOf(RIGHT, BOTTOM));
    assert.equal([99.5, 99.5], b.mid());
    assert.equal(109, b.maxX());
    assert.equal(114, b.maxY());
}