import { debugStat } from './debug.js'

/** Debug utility to measure time spent */
export class DebugTimer {
  /** @type {string} */
  _name
  /** @type {number[]} */
  _buffer = new Array(10)
  /** @type {number} */
  _pointer = 0
  /** @type {number} */
  _start = 0
  /** @type {number} */
  _peak = 0
  /**
   * @param {string} name
   */
  constructor(name) {
    this._name = name
    debugStat(name, () => `avg: ${this.average()}, peak: ${this._peak}`)
  }
  /** Start measuring time */
  start() {
    this._start = Date.now()
  }
  /** End the current measurement */
  end() {
    const delta = Date.now() - this._start
    this._buffer[this._pointer] = delta
    this._pointer = (this._pointer + 1) % this._buffer.length
    if (delta > this._peak) this._peak = delta
  }
  /**
   * Returns the average time in ms
   * @returns {number}
   */
  average() {
    let total = 0
    for (const delta of this._buffer) {
      total += delta
    }
    return total / this._buffer.length
  }
  /**
   * Returns the peak time in ms
   * @returns {number}
   */
  peak() {
    return this._peak
  }
}
