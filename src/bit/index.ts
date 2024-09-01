/** Checks if bits are set on a bitmask */
export function isSet(mask: number, state: number): boolean {
  return (mask & state) == state
}
/** Sets bits on a bitmask */
export function bitmaskAdd(mask: number, flag: number): number {
  return mask | flag
}
/** Removes bits from a bitmask */
export function bitmaskRemove(mask: number, flag: number): number {
  return mask & ~flag
}
