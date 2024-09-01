import { debugStat, removeStat } from './stats.js'

const timers: DebugTimer[] = []

export function enableTimers(enable: boolean) {
  if (enable) {
    _enableTimers()
    return
  }
  _disableTimers()
}

function _enableTimers() {
  for (const timer of timers) {
    timer._enabled = true
    debugStat(timer._name, timer.value)
  }
}

function _disableTimers() {
  for (const timer of timers) {
    timer._enabled = false
    removeStat(timer._name)
  }
}

/** Debug utility to measure time spent */
export class DebugTimer {
  _name: string
  _buffer: number[] = new Array(10)
  _pointer: number = 0
  _start: number = 0
  _peak: number = 0
  _enabled: boolean = false

  constructor(name: string) {
    this._name = name
  }
  /** Start measuring time */
  start() {
    if (this._enabled) {
      this._start = Date.now()
    }
  }
  /** End the current measurement */
  end() {
    if (this._enabled) {
      const delta = Date.now() - this._start
      this._buffer[this._pointer] = delta
      this._pointer = (this._pointer + 1) % this._buffer.length
      if (delta > this._peak) this._peak = delta
    }
  }
  value(): string {
    return `avg: ${this.average()}, peak: ${this.peak()}`
  }
  /** Returns the average time in ms */
  average(): number {
    let total = 0
    for (const delta of this._buffer) {
      total += delta
    }
    return total / this._buffer.length
  }
  /** Returns the peak time in ms */
  peak(): number {
    return this._peak
  }
}
