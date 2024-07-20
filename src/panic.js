import { Engine, PANIC } from './engine.js'
/**
 * This is recommended to use for unrecoverable errors, or any
 * other fault condition. This function is safe to call anytime.
 *
 * Will throw an error and halt the game loop.
 * @param {...any} args
 * @returns {Error}
 */
export function panic(...args) {
  console.error('NenginePanic:', ...args)
  Engine[PANIC] = true
  throw new Error('NenginePanicThrown!')
}
