/**
 * @template T
 */
export class Channel {
  /** @type {((value: T) => void)[]} */
  #cbs = []
  /** @returns {Promise<T>} */
  wait() {
    return new Promise((resolve) => {
      this.#cbs.push(resolve)
    })
  }
  /**
   * @param {T} value
   */
  send(value) {
    for (const cb of this.#cbs) {
      cb(value)
    }
  }
}
