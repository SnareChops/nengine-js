import type { Image } from '../types/index.js'

/** FrameAnimation represents timings for a single animation frame*/
export interface FrameAnimation {
  start: number
  duration: number
  frame: number
}
export type Animation = FrameAnimation[]

/**
 * A Frame-by-frame animator that can run specified frame-by-frame animations
 * Tip: Use in combination with Bounds to create an animated sprite
 */
export class FrameByFrameAnimator {
  #frames: Image[] = []
  #animations = new Map<string, Animation>()
  #active: Animation | undefined
  #frame: number = 0
  #elapsed: number = 0
  #loop: boolean = false

  constructor(frames: Image[]) {
    this.#frames = frames
  }

  /** addAnimation Adds a new named animation to the Animator */
  addAnimation(name: string, animation: Animation) {
    this.#animations.set(name, animation)
  }
  /**
   * clearAnimation Clears the currently active animation
   * and returns the image to the default image
   */
  clear() {
    this.#active = void 0
    this.#loop = false
    this.#elapsed = 0
  }
  /** startAnimation Starts an animation by it's name */
  startAnimation(name: string, loop: boolean) {
    this.#active = this.#animations.get(name)
    this.#loop = loop
    this.#elapsed = 0
  }
  /** image Returns the current active image for the animation */
  image(): Image {
    return this.#frames[this.#frame]
  }
  /** update Call this on every frame to "run" the animation */
  update(delta: number) {
    if (!this.#active) return
    const last = this.#active[this.#active.length - 1]
    const total = last.start + last.duration
    this.#elapsed += delta
    if (this.#elapsed >= total && !this.#loop) {
      this.clear()
    }
    this.#elapsed %= total
    for (const frame of this.#active) {
      if (this.#elapsed > frame.start) {
        this.#frame = frame.frame
      }
    }
  }
}
