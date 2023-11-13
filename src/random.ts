/** 
 * Returns a pseudo-random integer between 0 and n 
 * Hint: To get a random number between a range use `intn(max-min)+min`
 */
export function intn(n: number) {
    return Math.floor(Math.random() * n);
}
/**
 * Returns a pseudo-random number between 0 and n 
 * Hint: To get a random number between a range use `floatn(max-min)+min`
 */
export function floatn(n: number) {
    return Math.random() * n;
}