import { Engine, PANIC } from './engine.js'
/**
 * This is recommended to use for unrecoverable errors, or any
 * other fault condition. This function is safe to call anytime.
 *
 * Will throw an error and halt the game loop.
 */
export function panic(...args: any[]): Error {
  console.error('NenginePanic:', ...args)
  Engine[PANIC] = true
  throw new Error('NenginePanicThrown!')
}
