import { Engine } from './engine';
export const PANIC = Symbol('PANIC');
export const SHOULD_PANIC = Symbol('SHOULD_PANIC');

/** 
 * Enables "Panic Mode" for the game engine. This will **immediately**
 * stop the game loop at the current tick if `panic()` is called at any
 * time during execution. This is **highly** recommended to use during
 * development to allow for easier debugging, and prevent subsequent
 * errors from being thrown.  */
export function enablePanicMode() {
    Engine[PANIC] |= 1;
};

/**
 * This is recommended to use for unrecoverable errors, or any 
 * other fault condition. This function is safe to call anytime.
 * It's behaviour will depend on the PanicMode setting.
 * 
 * PanicMode: Will throw an error and halt the game loop.
 * 
 * NormalMode: Will log the error to the console, however will
 * not halt execution of the game loop, nor throw a true JS error.
 */
export function panic(...args: any): Error {
    console.error('NenginePanic:', ...args);
    Engine[PANIC] |= 2;
    throw new Error('NenginePanicThrown!')
}