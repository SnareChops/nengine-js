import { DebugTimer } from './timer.js'
import { debugStat, removeStat } from './stats.js'

export const frameTimers: FrameTimer[] = []

export function enableFrameTimers() {
  for (const timer of frameTimers) {
    timer._enabled = true
    debugStat(timer._name, timer.value)
  }
}

export function disableFrameTimers() {
  for (const timer of frameTimers) {
    timer._enabled = false
    removeStat(timer._name)
  }
}

/** Debug utility to measure time spent */
export class FrameTimer extends DebugTimer {
  #accumulator: number = 0

  constructor(name: string, auto: boolean) {
    super(name)
    if (auto) frameTimers.push(this)
  }
  /** Ends the current measurement segment */
  end() {
    if (this._enabled) {
      const delta = Date.now() - this._start
      this.#accumulator += delta
    }
  }
  /** Finalizes the measurement for this frame */
  endFrame() {
    if (this._enabled) {
      this._buffer[this._pointer] = this.#accumulator
      this._pointer = (this._pointer + 1) % this._buffer.length
      if (this.#accumulator > this._peak) this._peak = this.#accumulator
      this.#accumulator = 0
    }
  }
}
