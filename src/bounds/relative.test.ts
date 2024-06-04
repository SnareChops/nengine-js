import assert from '../../test/assert';
import { CENTER } from './bounds';
import { Raw } from './raw';
import { Relative } from './relative';

export function testRelativeBoundsAnchor() {
    const parent = new Raw(10, 10);
    const result = new Relative(parent, 8, 8);
    result.setAnchor(CENTER, CENTER);
    assert.equal([-4, -4], result.rawPos());
}