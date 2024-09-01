export class Channel<T> {
  #cbs: ((value: T) => void)[] = []

  wait(): Promise<T> {
    return new Promise((resolve) => {
      this.#cbs.push(resolve)
    })
  }

  send(value: T) {
    for (const cb of this.#cbs) {
      cb(value)
    }
  }
}
