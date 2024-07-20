import { cursorPosition } from '../mouse.js'
import { CameraBounds } from './camera-bounds.js'

/** BasicCamera represents a basic sliding camera implementation */
export class BasicCamera extends CameraBounds {
  /** @type {number} */
  #ww = 0
  /** @type {number} */
  #wh = 0
  /** @type {number} */
  #zoom = 1
  /** @type {import('../types/index.js').Box | undefined} */
  #target
  /**
   *
   * @param {number} viewWidth
   * @param {number} viewHeight
   * @param {number} worldWidth
   * @param {number} worldHeight
   */
  constructor(viewWidth, viewHeight, worldWidth, worldHeight) {
    super(viewWidth, viewHeight)
    this.#ww = worldWidth
    this.#wh = worldHeight
    this.#zoom = 1
    this.setPos(0, 0)
  }
  /**
   * Set the position of the camera center
   * @param {number} x
   * @param {number} y
   */
  setPos(x, y) {
    super.setPos(x, y)
    const [minX, minY] = this.min()
    const [maxX, maxY] = this.max()
    if (minX < 0) super.setPos(this.x() - minX, this.y())
    if (minY < 0) super.setPos(this.x(), this.y() - minY)
    if (maxX > this.#ww) super.setPos(this.x() - (maxX - this.#ww), this.y())
    if (maxY > this.#wh) super.setPos(this.x(), this.y() - (maxY - this.#wh))
  }
  /**
   * Get the zoom level of the camera
   * @returns {number}
   */
  zoom() {
    return this.#zoom
  }
  /**
   * Set the zoom level of the camera
   * @param {number} zoom
   */
  setZoom(zoom) {
    this.#zoom = zoom
    this.resize(this.dx() / this.#zoom, this.dy() / this.#zoom)
  }
  /**
   * Follow a target with the camera
   * Note: Requires calling update() to move the camera to the target's position
   * @param {import('../types/index.js').Box} target
   */
  follow(target) {
    this.#target = target
  }
  /**
   * Get the size of the camera's viewport
   * @returns {[number, number]}
   */
  viewSize() {
    return this.size()
  }
  /**
   * Get the size of the world
   * @returns {[number, number]}
   */
  worldSize() {
    return [this.#ww, this.#wh]
  }
  /**
   * Get a rectangle of absolute positions in world coordinates of
   * the camera's current viewport
   * @returns {[number, number, number, number]}
   */
  view() {
    return [this.minX(), this.minY(), this.maxX(), this.maxY()]
  }
  /**
   * Get the cursor's position in the world
   * @returns {[number, number]}
   */
  cursorWorldPosition() {
    return this.screenToWorldPos(...cursorPosition())
  }
  /**
   * Translate a world coordinate to screen coordinates based on the camera's current position
   * @param {number} x
   * @param {number} y
   * @returns {[x: number, y: number]}
   */
  worldToScreenPos(x, y) {
    return [(x - this.minX()) * this.#zoom, (y - this.minY()) * this.#zoom]
  }
  /**
   * Transform a screen coordinate to world coordinates based on the camera's current position
   * @param {number} screenX
   * @param {number} screenY
   * @returns {[x: number, y: number]}
   */
  screenToWorldPos(screenX, screenY) {
    return [
      this.minX() + screenX / this.#zoom,
      this.minY() + screenY / this.#zoom,
    ]
  }
  /** Updates the state of the camera */
  update() {
    if (!!this.#target) this.setPos(...this.#target.xy())
  }
}
