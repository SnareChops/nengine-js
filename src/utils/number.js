/**
 * @param {number} fromWidth
 * @param {number} fromHeight
 * @param {number} toWidth
 * @param {number} toHeight
 * @returns {[number, number]}
 */
export function scaleFactor(fromWidth, fromHeight, toWidth, toHeight) {
  return [fromWidth / toWidth, fromHeight / toHeight]
}
