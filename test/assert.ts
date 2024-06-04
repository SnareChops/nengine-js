export default {
    equal<T>(expected: T, actual: T) {
        if (expected === actual) return;
        if (expected == actual) return;
        if (expected === undefined) throw new Error(`Expected ${actual} to be undefined`);
        if (expected === null) throw new Error(`Expected ${actual} to be null`);
        if (actual === undefined) throw new Error(`Expected ${expected} found undefined instead`);
        if (actual === null) throw new Error(`Expected ${expected} found null instead`);
        if (Array.isArray(expected) && Array.isArray(actual)) {
            if (expected.length !== actual.length) throw new Error(`Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`);
            for (let i = 0; i < expected.length; i++) {
                this.equal(expected[i], actual[i]);
            }
            return;
        }
        if (typeof expected === 'object' && typeof actual === 'object') {
            for (const key in expected) {
                this.equal(expected[key], actual[key]);
            }
            return;
        }
        throw new Error(`Expected ${actual} to equal ${expected}`);
    },
    true(value: unknown) {
        if (value === true) return;
        throw new Error(`Expected true found ${value} instead`);
    },
    false(value: unknown) {
        if (value === false) return;
        throw new Error(`Expected false found ${value} instead`);
    }
};