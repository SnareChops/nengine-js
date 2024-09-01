import type { Image } from '../types/index.js'

export interface SimpleFrame {
  duration: number
  image: Image
}

export class SimpleAnimator {
  #frames: SimpleFrame[] = []
  #loop: boolean = false
  #active: boolean = false
  #cooldown: number = 0
  #index: number = 0

  constructor(frames: SimpleFrame[]) {
    this.#frames = frames
  }

  start(loop: boolean) {
    this.#loop = loop
    this.#cooldown = this.#frames[0].duration
    this.#active = true
  }

  isActive(): boolean {
    return this.#active
  }

  index(): number {
    return this.#index
  }

  update(delta: number) {
    if (!this.#active) return
    while (delta > 0) {
      delta = this.#update(delta)
    }
  }

  #update(delta: number): number {
    this.#cooldown -= delta
    if (this.#cooldown <= 0) {
      const rem = this.#cooldown * -1
      this.#next()
      if (rem > 0) return rem
    }
    return 0
  }

  #next() {
    this.#index++
    if (this.#index >= this.#frames.length) {
      this.#index = 0
      if (!this.#loop) {
        this.#active = false
        return
      }
    }
    this.#cooldown = this.#frames[this.#index].duration
  }

  image(): Image {
    return this.#frames[this.#index].image
  }
}
