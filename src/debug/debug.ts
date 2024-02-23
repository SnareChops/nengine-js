import { Color } from '../color';
import { Context } from '../image';
import { Position } from '../types/position';

let _debugEnabled: boolean = false;
let _debugFont: string = 'sans-serif';
let _debugColor: Color;
let _debugStats: stat[] = [];

interface stat {
    label: string;
    value: () => string;
}

/** Enables debug stat tracking and display */
export function enableDebug(font: string, color: Color = new Color(255, 255, 255, 255)) {
    _debugEnabled = true;
    _debugFont = font;
    _debugColor = color;
}
/** Checks if debug mode is enabled */
export function debugEnabled(): boolean {
    return _debugEnabled;
}
/**
 * Registers a debug statistic
 * Use this to add your own info to the debug stats
 * Function will only be called if debug mode is enabled
 */
export function debugStat(label: string, value: () => string) {
    for (const stat of _debugStats.values()) {
        if (stat.label == label) {
            stat.value = value;
            return;
        }
    }
    _debugStats.push({ label, value });
}

/**
 * Draw the debug information to the provided image (usually the screen)
 * If using the MainRenderer, this will be drawn automatically
 */
export function debugDraw(screen: Context) {
    if (!_debugEnabled) return;
    let s = '';
    for (const stat of _debugStats.values()) {
        if (!!stat.value) s += `${stat.label}: ${stat.value()}\n`;
    }
    screen.font = _debugFont;
    screen.fillStyle = _debugColor.hex();
    screen.fillText(s, 10, 70);
}
