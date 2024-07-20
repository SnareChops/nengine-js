import { Color } from '../color.js'
import { frameTimers } from './frame.js'

/**
 * @typedef stat
 * @prop {string} label
 * @prop {() => string} value
 */

/** @type {boolean} */
let _debugEnabled = false
/** @type {string} */
let _debugFont = 'sans-serif'
/** @type {Color} */
let _debugColor
/** @type {stat[]} */
let _debugStats = []

/** Enables debug stat tracking and display */
export function enableDebug() {
  _debugEnabled = true
}
/**
 * Checks if debug mode is enabled
 * @returns {boolean}
 */
export function debugEnabled() {
  return _debugEnabled
}
/**
 * Registers a debug statistic
 * Use this to add your own info to the debug stats
 * Function will only be called if debug mode is enabled
 * @param {string} label
 * @param {() => string} value
 */
export function debugStat(label, value) {
  for (const stat of _debugStats) {
    if (stat.label == label) {
      stat.value = value
      return
    }
  }
  _debugStats.push({ label, value })
}
/**
 * Update the automatic frame timers
 */
export function debugUpdate() {
  if (!_debugEnabled) return
  for (const timer of frameTimers) {
    timer.endFrame()
  }
}
/**
 * Draw the debug information to the provided image (usually the screen)
 * If using the MainRenderer, this will be drawn automatically
 * @param {import('../image.js').Context} screen
 */
export function debugDraw(screen) {
  if (!_debugEnabled) return
  let s = ''
  for (const stat of _debugStats.values()) {
    if (!!stat.value) s += `${stat.label}: ${stat.value()}\n`
  }
  screen.font = _debugFont
  screen.fillStyle = _debugColor.hex()
  screen.fillText(s, 10, 70)
}
