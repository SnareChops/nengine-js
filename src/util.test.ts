import assert from '../test/assert';
import { Raw } from './bounds/raw';
import { gridPointsAroundBounds, ints, relativePosition } from './util';

export function testInts() {
    const a = 1.5, b = 2.5;
    assert.equal([1, 2], ints(a, b));
}

export function testRelativePosition() {
    let bounds = new Raw(10, 20);
    bounds.setPos2(5, 10);
    assert.equal([5, 10], relativePosition(10, 20, bounds));

    bounds = new Raw(10, 20);
    bounds.setPos2(5, 10);
    assert.equal([7, 3], relativePosition(12, 13, bounds));
}

export function testGridPointsAroundBounds() {
    const bounds = new Raw(40, 20);
    bounds.setPos2(30, 30);
    const result = gridPointsAroundBounds(bounds, 10, 10);

    assert.equal(16, result.length);
    //corner
    assert.equal([25, 25], result[0].xy());
    assert.equal([35, 25], result[1].xy());
    assert.equal([45, 25], result[2].xy());
    assert.equal([55, 25], result[3].xy());
    assert.equal([65, 25], result[4].xy());
    // corner
    assert.equal([75, 25], result[5].xy());
    assert.equal([75, 35], result[6].xy());
    assert.equal([75, 45], result[7].xy());
    // corner
    assert.equal([75, 55], result[8].xy());
    assert.equal([65, 55], result[9].xy());
    assert.equal([55, 55], result[10].xy());
    assert.equal([45, 55], result[11].xy());
    assert.equal([35, 55], result[12].xy());
    // corner
    assert.equal([25, 55], result[13].xy());
    assert.equal([25, 45], result[14].xy());
    assert.equal([25, 35], result[15].xy());
}