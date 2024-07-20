import { isSet } from './bit/index.js'

/**
 * The default IDLE stage
 * @type {import('./types/index.js').TimerStage}
 */
export const TimerStageIdle = 1
/**
 * Utility for handling timings for various things
 * Helpful for implementing player abilities, or animations
 */
export class Timer {
  /** @type {import('./types/index.js').TimerStage} */
  #stage = 1
  /** @type {Map<import('./types/index.js').TimerStage, number>} */
  #timers = new Map()
  /** @type {Map<import('./types/index.js').TimerStage, number>} */
  #counters = new Map()
  /** @type {import('./types/index.js').TimerStage} */
  #elapsed = 0
  /** @type {boolean} */
  #looping = false
  /**
   * Add a new stage to the timer, returns an identifier for this new stage
   * @param {number} duration
   * @returns {import('./types/index.js').TimerStage}
   */
  addStage(duration) {
    let max = TimerStageIdle
    for (const stage of this.#timers.keys()) {
      if (stage > max) max = stage
    }
    let stage = TimerStageIdle << 1
    if (max != TimerStageIdle) stage = max << 1
    this.#timers.set(stage, duration)
    return stage
  }
  /**
   * Set the duration of a timer stage
   * @param {import('./types/index.js').TimerStage} stage
   * @param {number} duration
   */
  setStage(stage, duration) {
    this.#timers.set(stage, duration)
  }
  /**
   * Get the duration of a timer stage (undefined if an unknown stage)
   * @param {import('./types/index.js').TimerStage} stage
   * @returns {number|undefined}
   */
  getStage(stage) {
    return this.#timers.get(stage)
  }
  /**
   * Returns the full timing structure
   * @returns {Map<import('./types/index.js').TimerStage, number>}
   */
  timings() {
    return this.#timers
  }
  /**
   * Returns the identifier of the current stage
   * @returns {import('./types/index.js').TimerStage}
   */
  stage() {
    return this.#stage
  }
  /**
   * Starts the timer
   * @param {boolean} looping
   */
  start(looping = false) {
    if (this.#stage == TimerStageIdle) {
      this.#looping = looping
      for (const [stage, time] of this.#timers.entries()) {
        this.#counters.set(stage, time)
      }
      this.#next()
    }
  }
  /** Stops the timer */
  stop() {
    this.#stage = TimerStageIdle
  }
  /** Forces the timer to move to the next stage immediately */
  next() {
    if (this.#stage != TimerStageIdle) this.#next()
  }
  /**
   * Update the timer
   * @param {number} delta
   */
  update(delta) {
    this.#elapsed = 0
    this.#update(delta)
  }
  /**
   * Returns a number between 0 and 1 that represents the progress through the current stage
   * @returns {number}
   */
  stagePercent() {
    const time = this.#timers.get(this.#stage)
    const count = this.#counters.get(this.#stage)
    if (typeof time != 'number' || typeof count != 'number') return 0
    return (time - count) / time
  }
  /**
   * Checks if the provided stage elapsed this frame
   * @param {import('./types/index.js').TimerStage} stage
   * @returns {boolean}
   */
  elapsed(stage) {
    return isSet(this.#elapsed, stage)
  }
  // TODO: Change elapsed to only contain Idle on the first activation of
  // the timer if the timer is looping

  // Moves the timer to the next state
  #next() {
    this.#elapsed |= this.#stage
    // If there is no next step, unless looping == true
    if (!this.#timers.has(this.#stage << 1)) {
      this.#stage = TimerStageIdle
      if (this.#looping) this.start(this.#looping)
      return
    }
    // For any other state, move to the next state
    this.#stage <<= 1
    if (this.#timers.get(this.#stage) == 0) this.#next()
  }
  /**
   * @param {number} delta
   */
  #update(delta) {
    if (delta <= 0 || this.#stage == TimerStageIdle) return
    let counter = this.#counters.get(this.#stage)
    if (counter !== void 0) {
      counter -= delta
      this.#counters.set(this.#stage, counter)
      if (counter <= 0) {
        const rem = counter * -1
        this.#next()
        this.#update(rem)
      }
    }
  }
}
