const top = 0
/** @type {(i: number) => number} */
const parent = (i) => ((i + 1) >>> 1) - 1
/** @type {(i: number) => number} */
const left = (i) => (i << 1) + 1
/** @type {(i: number) => number} */
const right = (i) => (i + 1) << 1
/**
 * @class PriorityQueue
 * @template T
 * @default T {number}
 */
export class PriorityQueue {
  /** @type {T[]} */
  #heap
  /** @type {(a: T, b: T) => boolean} */
  #comparator
  /**
   * @param {(a: T, b: T) => boolean} comparator
   */
  constructor(comparator = (a, b) => a > b) {
    this.#heap = []
    this.#comparator = comparator
  }
  /**
   * @returns {number}
   */
  size() {
    return this.#heap.length
  }
  /**
   * @returns {boolean}
   */
  isEmpty() {
    return this.size() == 0
  }
  /**
   * @returns {T}
   */
  peek() {
    return this.#heap[top]
  }
  /**
   * @param  {...T} values
   * @returns {number}
   */
  push(...values) {
    for (const value of values) {
      this.#heap.push(value)
      this.#siftUp()
    }
    return this.size()
  }
  /**
   * @returns {T}
   */
  pop() {
    const poppedValue = this.peek()
    const bottom = this.size() - 1
    if (bottom > top) this.#swap(top, bottom)
    this.#heap.pop()
    this.#siftDown()
    return poppedValue
  }
  /**
   * @param {T} value
   * @returns {T}
   */
  replace(value) {
    const replacedValue = this.peek()
    this.#heap[top] = value
    this.#siftDown()
    return replacedValue
  }
  /**
   * @param {number} index
   * @param {T} value
   * @returns {T}
   */
  replaceAt(index, value) {
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
  /**
   * @param {number} index
   */
  fix(index) {
    if (index < 0 || index >= this.size()) {
      throw new Error('Index out of bounds')
    }
    if (!this.#siftUpFrom(index)) {
      this.#siftDownFrom(index)
    }
  }
  /**
   * @param {number} i
   * @param {number} j
   */
  #greater(i, j) {
    return this.#comparator(this.#heap[i], this.#heap[j])
  }
  /**
   * @param {number} i
   * @param {number} j
   */
  #swap(i, j) {
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
  /**
   * @param {number} node
   * @returns {boolean}
   */
  #siftUpFrom(node) {
    let original = node
    while (node > top && this.#greater(node, parent(node))) {
      this.#swap(node, parent(node))
      node = parent(node)
    }
    return node !== original
  }
  /**
   * @param {number} node
   */
  #siftDownFrom(node) {
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
