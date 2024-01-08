import { Engine } from './engine';
export const KEYS = Symbol('KEYS');

/** 
 * Key maps to the physical key on the keyboard
 * not the character produced when typing 
 */
export enum Key {
    Backquote = 'Backquote',
    Digit1 = 'Digit1',
    Digit2 = 'Digit2',
    Digit3 = 'Digit3',
    Digit4 = 'Digit4',
    Digit5 = 'Digit5',
    Digit6 = 'Digit6',
    Digit7 = 'Digit7',
    Digit8 = 'Digit8',
    Digit9 = 'Digit9',
    Digit0 = 'Digit0',
    Minus = 'Minus',
    Equal = 'Equal',
    Backspace = 'Backspace',

    Tab = 'Tab',
    KeyQ = 'KeyQ',
    KeyW = 'KeyW',
    KeyE = 'KeyE',
    KeyR = 'KeyR',
    KeyT = 'KeyT',
    KeyY = 'KeyY',
    KeyU = 'KeyU',
    KeyI = 'KeyI',
    KeyO = 'KeyO',
    KeyP = 'KeyP',
    BracketLeft = 'BracketLeft',
    BracketRight = 'BracketRight',
    Backslash = 'Backslash',

    CapsLock = 'CapsLock',
    KeyA = 'KeyA',
    KeyS = 'KeyS',
    KeyD = 'KeyD',
    KeyF = 'KeyF',
    KeyG = 'KeyG',
    KeyH = 'KeyH',
    KeyJ = 'KeyJ',
    KeyK = 'KeyK',
    KeyL = 'KeyL',
    Semicolon = 'Semicolon',
    Quote = 'Quote',
    Enter = 'Enter',

    ShiftLeft = 'ShiftLeft',
    KeyZ = 'KeyZ',
    KeyX = 'KeyX',
    KeyC = 'KeyC',
    KeyV = 'KeyV',
    KeyB = 'KeyB',
    KeyN = 'KeyN',
    KeyM = 'KeyM',
    Comma = 'Comma',
    Period = 'Period',
    Slash = 'Slash',
    ShiftRight = 'ShiftRight',

    ControlLeft = 'ControlLeft',
    AltLeft = 'AltLeft',
    Space = 'Space',
    AltRight = 'AltRight',
    ContextMenu = 'ContextMenu',
    ControlRight = 'ControlRight',

    Insert = 'Insert',
    Home = 'Home',
    PageUp = 'PageUp',
    Delete = 'Delete',
    End = 'End',
    PageDown = 'PageDown',

    Numpad0 = 'Numpad0',
    Numpad1 = 'Numpad1',
    Numpad2 = 'Numpad2',
    Numpad3 = 'Numpad3',
    Numpad4 = 'Numpad4',
    Numpad5 = 'Numpad5',
    Numpad6 = 'Numpad6',
    Numpad7 = 'Numpad7',
    Numpad8 = 'Numpad8',
    Numpad9 = 'Numpad9',
    NumpadDivide = 'NumpadDivide',
    NumpadMultiply = 'NumpadMultiply',
    NumpadSubtract = 'NumpadSubtract',
    NumpadAdd = 'NumpadAdd',
    NumpadEnter = 'NumpadEnter',
    NumpadDecimal = 'NumpadDecimal',
}

const printable = "`~1234567890!@#$%^&*()-_=+qwertyuiop[]\\QWERTYUIOP{}|asdfghjkl;'ASDFGHJKL:\"zxcvbnm,./ZXCVBNM<>? ".split('');
export function isPrintableChar(char: string): boolean {
    if (printable.includes(char)) {
        return true;
    }
    return false;
}

export interface KeyInfo {
    pressed: Key[];
    prev: Key[];
    chars: string[];
    shift: boolean;
    control: boolean;
    alt: boolean;
    meta: boolean;
}

export function keyInit(): KeyInfo {
    return { pressed: [], prev: [], chars: [], shift: false, control: false, alt: false, meta: false };
}

export function isKeyPressed(key: Key): boolean {
    return Engine[KEYS].pressed.includes(key);
}

export function isKeyJustPressed(key: Key): boolean {
    return Engine[KEYS].pressed.includes(key) && !Engine[KEYS].prev.includes(key);
}

export function isKeyReleased(key: Key): boolean {
    return !isKeyPressed(key);
}

export function isKeyJustReleased(key: Key): boolean {
    return Engine[KEYS].prev.includes(key) && !Engine[KEYS].pressed.includes(key);
}

export function typedThisFrame(): string {
    return Engine[KEYS].chars.filter(isPrintableChar).join('');
}

export function keysJustPressed(): Key[] {
    const result: Key[] = [];
    for (const key of Engine[KEYS].pressed) {
        if (!Engine[KEYS].prev.includes(key)) result.push(key);
    }
    return result;
}