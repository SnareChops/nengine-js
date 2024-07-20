/**
 * Checks if bits are set on a bitmask
 * @param {number} mask
 * @param {number} state
 * @returns {boolean}
 */
export function isSet(mask, state) {
  return (mask & state) == state
}
/**
 * Sets bits on a bitmask
 * @param {number} mask
 * @param {number} state
 * @returns {number}
 */
export function bitmaskAdd(mask, state) {
  return mask | state
}
/**
 * Removes bits from a bitmask
 * @param {number} mask
 * @param {number} state
 * @returns {number}
 */
export function bitmaskRemove(mask, state) {
  return mask & ~state
}
