import { Box } from '../bounds/index.js'
import { Color } from '../color.js'
import { CONTEXT, Engine } from '../engine.js'

/** Text represents a drawable text block */
export class Text extends Box {
  /** @type {number} */
  // @ts-expect-error ts(2564)
  ascent
  /** @type {number} */
  // @ts-expect-error ts(2564)
  descent
  /** @type {string} */
  font
  /** @type {number} */
  kerning
  /** @type {string[]} */
  lines = []
  /** @type {Color} */
  color
  /**
   * @param {string} value
   * @param {number} kerning
   * @param {string} font
   * @param {Color} color
   */
  constructor(value, kerning, font, color) {
    super()
    this.color = color
    this.kerning = kerning
    this.font = font
    this.lines = value.split('\n')
    this.#resize()
  }
  /**
   * Wrap all lines of text to fit within the provided constraint
   * @param {number} width
   */
  wrap(width) {
    let curr = ''
    /** @type {string[]} */
    const wrapped = []
    const context = Engine[CONTEXT]
    context.font = this.font
    for (const line of this.lines) {
      let words = line.split(' ')
      for (let i = 0; i < words.length; i++) {
        if (i == 0) curr = words[i]
        else curr += ' ' + words[i]
        if (context.measureText(curr).width > width) {
          wrapped.push(words.slice(0, i).join(' '))
          words = words.slice(0, i)
          curr = ''
          i = -1
        }
      }
      wrapped.push(words.join(' '))
    }
    this.lines = wrapped
    this.#resize()
  }

  #resize() {
    let w = 0,
      h = -this.kerning
    const context = Engine[CONTEXT]
    for (const line of this.lines) {
      context.font = this.font
      const metrics = context.measureText(line)
      this.ascent = metrics.actualBoundingBoxAscent
      this.descent = metrics.actualBoundingBoxDescent
      h +=
        metrics.actualBoundingBoxAscent +
        metrics.actualBoundingBoxDescent +
        this.kerning
      if (w < metrics.width) w = metrics.width
    }
    this.resize(w, h)
  }
}
/**
 * Draws text to the canvas
 * @param {import('../image.js').Context} context
 * @param {Text} text
 */
export function drawText(context, text) {
  for (const [i, line] of text.lines.entries()) {
    const height = text.ascent + text.descent
    context.font = text.font
    context.fillStyle = text.color.hex()
    context.fillText(line, text.x(), text.y() + i * height + text.ascent)
  }
}
