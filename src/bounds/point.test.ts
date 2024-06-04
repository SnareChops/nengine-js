import { Point } from '.';
import assert from '../../test/assert';

export function testSetPos() {
    let point = Point(0, 0);
    point.setPos2(10, 12);
    assert.equal(10, point.x());
    assert.equal(12, point.y());

    point = Point(0, 0);
    point.setPos3(10, 11, 12);
    assert.equal(10, point.x());
    assert.equal(11, point.y());
    assert.equal(12, point.z());
}

export function testGridAlign() {
    let point = Point(0, 0);
    point.gridAlign(64, 64);
    assert.equal(0, point.x());
    assert.equal(0, point.y());

    point = Point(10, 10);
    point.gridAlign(64, 64);
    assert.equal(0, point.x());
    assert.equal(0, point.y());

    point = Point(65, 65);
    point.gridAlign(64, 64);
    assert.equal(64, point.x());
    assert.equal(64, point.y());
}