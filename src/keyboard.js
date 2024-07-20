import { Engine } from './engine.js'
export const KEYS = Symbol('KEYS')

/**
 * Key maps to the physical key on the keyboard
 * not the character produced when typing
 * @readonly
 * @enum {string}
 */
export const Key = {
  Backquote: 'Backquote',
  Digit1: 'Digit1',
  Digit2: 'Digit2',
  Digit3: 'Digit3',
  Digit4: 'Digit4',
  Digit5: 'Digit5',
  Digit6: 'Digit6',
  Digit7: 'Digit7',
  Digit8: 'Digit8',
  Digit9: 'Digit9',
  Digit0: 'Digit0',
  Minus: 'Minus',
  Equal: 'Equal',
  Backspace: 'Backspace',

  Tab: 'Tab',
  KeyQ: 'KeyQ',
  KeyW: 'KeyW',
  KeyE: 'KeyE',
  KeyR: 'KeyR',
  KeyT: 'KeyT',
  KeyY: 'KeyY',
  KeyU: 'KeyU',
  KeyI: 'KeyI',
  KeyO: 'KeyO',
  KeyP: 'KeyP',
  BracketLeft: 'BracketLeft',
  BracketRight: 'BracketRight',
  Backslash: 'Backslash',

  CapsLock: 'CapsLock',
  KeyA: 'KeyA',
  KeyS: 'KeyS',
  KeyD: 'KeyD',
  KeyF: 'KeyF',
  KeyG: 'KeyG',
  KeyH: 'KeyH',
  KeyJ: 'KeyJ',
  KeyK: 'KeyK',
  KeyL: 'KeyL',
  Semicolon: 'Semicolon',
  Quote: 'Quote',
  Enter: 'Enter',

  ShiftLeft: 'ShiftLeft',
  KeyZ: 'KeyZ',
  KeyX: 'KeyX',
  KeyC: 'KeyC',
  KeyV: 'KeyV',
  KeyB: 'KeyB',
  KeyN: 'KeyN',
  KeyM: 'KeyM',
  Comma: 'Comma',
  Period: 'Period',
  Slash: 'Slash',
  ShiftRight: 'ShiftRight',

  ControlLeft: 'ControlLeft',
  AltLeft: 'AltLeft',
  Space: 'Space',
  AltRight: 'AltRight',
  ContextMenu: 'ContextMenu',
  ControlRight: 'ControlRight',

  Insert: 'Insert',
  Home: 'Home',
  PageUp: 'PageUp',
  Delete: 'Delete',
  End: 'End',
  PageDown: 'PageDown',

  Numpad0: 'Numpad0',
  Numpad1: 'Numpad1',
  Numpad2: 'Numpad2',
  Numpad3: 'Numpad3',
  Numpad4: 'Numpad4',
  Numpad5: 'Numpad5',
  Numpad6: 'Numpad6',
  Numpad7: 'Numpad7',
  Numpad8: 'Numpad8',
  Numpad9: 'Numpad9',
  NumpadDivide: 'NumpadDivide',
  NumpadMultiply: 'NumpadMultiply',
  NumpadSubtract: 'NumpadSubtract',
  NumpadAdd: 'NumpadAdd',
  NumpadEnter: 'NumpadEnter',
  NumpadDecimal: 'NumpadDecimal',
}

const printable =
  '`~1234567890!@#$%^&*()-_=+qwertyuiop[]\\QWERTYUIOP{}|asdfghjkl;\'ASDFGHJKL:"zxcvbnm,./ZXCVBNM<>? '.split(
    '',
  )
/**
 * @returns {import('./types/index.js').KeyInfo}
 */
export function keyInit() {
  return {
    pressed: [],
    prev: [],
    chars: [],
    shift: false,
    control: false,
    alt: false,
    meta: false,
  }
}
/**
 * @param {Key} key
 * @returns {boolean}
 */
export function isKeyPressed(key) {
  return Engine[KEYS].pressed.includes(key)
}
/**
 * @param {Key} key
 * @returns {boolean}
 */
export function isKeyJustPressed(key) {
  return Engine[KEYS].pressed.includes(key) && !Engine[KEYS].prev.includes(key)
}
/**
 * @param {Key} key
 * @returns {boolean}
 */
export function isKeyReleased(key) {
  return !isKeyPressed(key)
}
/**
 * @param {Key} key
 * @returns {boolean}
 */
export function isKeyJustReleased(key) {
  return Engine[KEYS].prev.includes(key) && !Engine[KEYS].pressed.includes(key)
}
/**
 * @returns {string}
 */
export function typedThisFrame() {
  return Engine[KEYS].chars.filter(printable.includes).join('')
}
/**
 * @returns {Key[]}
 */
export function keysJustPressed() {
  /** @type {Key[]} */
  const result = []
  for (const key of Engine[KEYS].pressed) {
    if (!Engine[KEYS].prev.includes(key)) result.push(key)
  }
  return result
}
