const top = 0
const parent: (i: number) => number = (i) => ((i + 1) >>> 1) - 1
const left: (i: number) => number = (i) => (i << 1) + 1
const right: (i: number) => number = (i) => (i + 1) << 1

export class PriorityQueue<T = number> {
  #heap: T[]
  #comparator: (a: T, b: T) => boolean

  constructor(comparator: (a: T, b: T) => boolean = (a, b) => a > b) {
    this.#heap = []
    this.#comparator = comparator
  }

  size(): number {
    return this.#heap.length
  }

  isEmpty(): boolean {
    return this.size() == 0
  }

  peek(): T {
    return this.#heap[top]
  }

  push(...values: T[]): number {
    for (const value of values) {
      this.#heap.push(value)
      this.#siftUp()
    }
    return this.size()
  }

  pop(): T {
    const poppedValue = this.peek()
    const bottom = this.size() - 1
    if (bottom > top) this.#swap(top, bottom)
    this.#heap.pop()
    this.#siftDown()
    return poppedValue
  }

  replace(value: T): T {
    const replacedValue = this.peek()
    this.#heap[top] = value
    this.#siftDown()
    return replacedValue
  }

  replaceAt(index: number, value: T): T {
    if (index < 0 || index >= this.size()) {
      throw new Error('Index out of bounds')
    }
    const replaced = this.#heap[index]
    this.#heap[index] = value
    if (this.#greater(index, parent(index))) {
      this.#siftUpFrom(index)
    } else {
      this.#siftDownFrom(index)
    }
    return replaced
  }

  fix(index: number) {
    if (index < 0 || index >= this.size()) {
      throw new Error('Index out of bounds')
    }
    if (!this.#siftUpFrom(index)) {
      this.#siftDownFrom(index)
    }
  }

  #greater(i: number, j: number) {
    return this.#comparator(this.#heap[i], this.#heap[j])
  }

  #swap(i: number, j: number) {
    ;[this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]]
  }

  #siftUp() {
    let node = this.size() - 1
    while (node > top && this.#greater(node, parent(node))) {
      this.#swap(node, parent(node))
      node = parent(node)
    }
  }

  #siftDown() {
    let node = top
    while (
      (left(node) < this.size() && this.#greater(left(node), node)) ||
      (right(node) < this.size() && this.#greater(right(node), node))
    ) {
      let maxChild =
        right(node) < this.size() && this.#greater(right(node), left(node))
          ? right(node)
          : left(node)
      this.#swap(node, maxChild)
      node = maxChild
    }
  }

  #siftUpFrom(node: number): boolean {
    let original = node
    while (node > top && this.#greater(node, parent(node))) {
      this.#swap(node, parent(node))
      node = parent(node)
    }
    return node !== original
  }

  #siftDownFrom(node: number) {
    while (
      (left(node) < this.size() && this.#greater(left(node), node)) ||
      (right(node) < this.size() && this.#greater(right(node), node))
    ) {
      let maxChild =
        right(node) < this.size() && this.#greater(right(node), left(node))
          ? right(node)
          : left(node)
      this.#swap(node, maxChild)
      node = maxChild
    }
  }
}
