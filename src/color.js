import { panic } from './panic.js'

/** Represents a color that can be used within nengine */
export class Color {
  /** @type {number} */
  #r
  /** @type {number} */
  #g
  /** @type {number} */
  #b
  /** @type {number} */
  #a

  /**
   * Creates a color from a hex string
   * Note: This is inefficient and is recommended to use number
   * based colors where possible using the main `Color` constructor
   * @param {string} hex
   * @returns {Color}
   */
  static fromHex(hex) {
    hex = hex.toLowerCase()
    if (hex.startsWith('#')) hex = hex.slice(1)
    if (/^[a-f0-9]{3}$/.test(hex))
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + 'ff'
    else if (/^[a-f0-9]{4}$/.test(hex))
      hex =
        hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
    else if (/^[a-f0-9]{6}$/.test(hex)) hex = hex + 'ff'
    else if (/^[a-f0-9]{8}$/.test(hex)) {
    } else throw panic('Invalid hex string')
    const int = parseInt(hex.startsWith('#') ? hex.slice(1) : hex, 16)
    const r = (int >> 24) & 255
    const g = (int >> 16) & 255
    const b = (int >> 8) & 255
    const a = int & 255
    return new Color(r, g, b, a)
  }

  /**
   * Attempts to lookup a browser supported color by it's name
   * If no matching color is found, the end result will be
   * transparent black (0,0,0,0)
   * Note: This can be good for quick prototyping and testing
   * but is very inefficient. Strongly preferred to use explicit
   * colors where possible.
   * @param {string} name
   * @returns {Color}
   */
  static named(name) {
    const div = document.createElement('div')
    div.style.color = name
    document.body.append(div)
    const color = Color.fromHex(window.getComputedStyle(div).color)
    div.remove()
    return color
  }
  /**
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @param {number} a
   */
  constructor(r, g, b, a) {
    this.#r = r
    this.#g = g
    this.#b = b
    this.#a = a
  }
  /**
   * Gets and/or sets the red value 0-255
   * @param {number} [r]
   * @return {number}
   */
  r(r) {
    if (r && r > 0) this.#r = r
    return this.#r
  }
  /**
   * Gets and/or sets the green value 0-255
   * @param {number} [g]
   * @returns {number}
   */
  g(g) {
    if (g && g > 0) this.#g = g
    return this.#g
  }
  /**
   * Gets and/or sets the blue value 0-255
   * @param {number} [b]
   * @returns {number}
   */
  b(b) {
    if (b && b > 0) this.#b = b
    return this.#b
  }
  /**
   * Gets and/or sets the alpha value 0-255
   * @param {number} [a]
   * @returns {number}
   */
  a(a) {
    if (a && a > 0) this.#a = a
    return this.#a
  }
  /**
   * Gets and/or sets the red and green values 0-255
   * @param {number} [r]
   * @param {number | undefined} [g]
   * @returns {[r: number, g: number]}
   */
  rg(r, g = r) {
    if (r && r > 0) this.#r = r
    if (g && g > 0) this.#g = g
    return [this.#r, this.#g]
  }
  /**
   * Gets and/or sets the red and blue values 0-255
   * @param {number} [r]
   * @param {number} [b]
   * @returns {[r: number, b: number]}
   */
  rb(r, b = r) {
    if (r && r > 0) this.#r = r
    if (b && b > 0) this.#b = b
    return [this.#r, this.#b]
  }
  /**
   * Gets and/or sets the red and alpha values 0-255
   * @param {number} [r]
   * @param {number | undefined} [r]
   * @returns {[r: number, a: number]}
   */
  ra(r, a = r) {
    if (r && r > 0) this.#r = r
    if (a && a > 0) this.#a = a
    return [this.#r, this.#a]
  }
  /**
   * Gets and/or sets the green and blue values 0-255
   * @param {number} [g]
   * @param {number | undefined} [g]
   * @returns {[g: number, b: number]}
   */
  gb(g, b = g) {
    if (g && g > 0) this.#g = g
    if (b && b > 0) this.#b = b
    return [this.#g, this.#b]
  }
  /**
   * Gets and/or sets the green and alpha values 0-255
   * @param {number} [g]
   * @param {number | undefined}[a]
   * @returns {[g: number, a: number]}
   */
  ga(g, a = g) {
    if (g && g > 0) this.#g = g
    if (a && a > 0) this.#a = a
    return [this.#g, this.#a]
  }
  /**
   * Gets and/or sets the blue and alpha values 0-255
   * @param {number} [b]
   * @param {number | undefined} [a]
   * @returns {[b: number, a: number]}
   */
  ba(b, a = b) {
    if (b && b > 0) this.#b = b
    if (a && a > 0) this.#a = a
    return [this.#b, this.#a]
  }
  /**
   * Gets and/or sets the red, green, blue values 0-255
   * @param {number} [r]
   * @param {number | undefined} [g]
   * @param {number | undefined} [b]
   * @returns {[r: number, g: number, b: number]}
   */
  rgb(r, g = r, b = r) {
    if (r && r > 0) this.#r = r
    if (g && g > 0) this.#g = g
    if (b && b > 0) this.#b = b
    return [this.#r, this.#g, this.#b]
  }
  /**
   * Gets and/or sets the red, greeen, alpha values 0-255
   * @param {number} [r]
   * @param {number | undefined} [g]
   * @param {number | undefined} [a]
   * @returns {[r: number, g: number, a: number]}
   */
  rga(r, g = r, a = r) {
    if (r && r > 0) this.#r = r
    if (g && g > 0) this.#g = g
    if (a && a > 0) this.#a = a
    return [this.#r, this.#g, this.#a]
  }
  /**
   * Gets and/or sets the red, blue, alpha values 0-255
   * @param {number} [r]
   * @param {number | undefined} [b]
   * @param {number | undefined} [a]
   * @return {[r: number, b: number, a: number]}
   */
  rba(r, b = r, a = r) {
    if (r && r > 0) this.#r = r
    if (b && b > 0) this.#b = b
    if (a && a > 0) this.#a = a
    return [this.#r, this.#b, this.#a]
  }
  /**
   * Gets and/or sets the green, blue, alpha values 0-255
   * @param {number} [g]
   * @param {number|undefined} [b]
   * @param {number|undefined} [a]
   * @returns {[g: number,b: number,a: number]}
   */
  gba(g, b = g, a = g) {
    if (g && g > 0) this.#g = g
    if (b && b > 0) this.#b = b
    if (a && a > 0) this.#a = a
    return [this.#g, this.#b, this.#a]
  }
  /**
   * Gets and/or sets the red, green, blue, alpha values 0-255
   * @param {number} [r]
   * @param {number|undefined} [g]
   * @param {number|undefined} [b]
   * @param {number|undefined} [a]
   * @returns {[r: number, g: number, b: number, a: number]}
   */
  rgba(r, g = r, b = r, a = r) {
    if (r && r > 0) this.#r = r
    if (g && g > 0) this.#g = g
    if (b && b > 0) this.#b = b
    if (a && a > 0) this.#a = a
    return [this.#r, this.#g, this.#b, this.#a]
  }
  /**
   * Gets a hex string representing the color
   * @returns {string}
   */
  hex() {
    return (
      '#' +
      this.#r.toString(16).padStart(2, '0') +
      this.#g.toString(16).padStart(2, '0') +
      this.#b.toString(16).padStart(2, '0') +
      this.#a.toString(16).padStart(2, '0')
    )
  }
  /**
   * Gets the color as components from 0-1
   * @returns {[r: number, g: number, b: number, a: number]}
   */
  floats() {
    return [this.#r / 255, this.#g / 255, this.#b / 255, this.#a / 255]
  }
}
