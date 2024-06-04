
export function isSet(mask: number, state: number): boolean {
    return (mask & state) == state;
}

export function bitmaskAdd(mask: number, state: number): number {
    return mask | state;
}

export function bitmaskRemove(mask: number, state: number): number {
    return mask & ~state;
}