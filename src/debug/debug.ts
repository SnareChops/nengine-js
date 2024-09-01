import { stats } from './stats.js'
import { frameTimers } from './frame.js'
import type { Context } from '../types/index.js'

export function update() {
  for (const timer of frameTimers) {
    timer.endFrame()
  }
}

/**
 * Draw the debug information to the provided image (usually the screen)
 * If using the MainRenderer, this will be drawn automatically
 */
export function draw(screen: Context) {
  let s = ''
  for (const stat of stats) {
    if (stat.value) s += `${stat.label}: ${stat.value()}\n`
  }
  screen.font = 'sans-serif'
  screen.fillStyle = 'white'
  screen.fillText(s, 10, 70)
}
