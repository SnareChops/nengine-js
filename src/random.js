/**
 * Returns a pseudo-random integer between 0 and n
 * Hint: To get a random number between a range use `intn(max-min)+min`
 * @param {number} n
 */
export function intn(n) {
  return Math.floor(Math.random() * n)
}
/**
 * Returns a pseudo-random number between 0 and n
 * Hint: To get a random number between a range use `floatn(max-min)+min`
 * @param {number} n
 */
export function floatn(n) {
  return Math.random() * n
}
