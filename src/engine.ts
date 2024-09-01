import { KEYS, keyInit, mouseInit, Key } from './input/index.js'
import { panic } from './panic.js'
import type { MouseInfo, KeyInfo, Game } from './types/index.js'

export const MOUSE = Symbol('MOUSE')
export const PANIC = Symbol('PANIC')
export const CONTEXT = Symbol('CONTEXT')

export class Engine {
  static [PANIC]: boolean = false
  static [CONTEXT]: CanvasRenderingContext2D
  static [MOUSE]: MouseInfo = mouseInit()
  static [KEYS]: KeyInfo = keyInit()
  prev: number = 0
  game: Game | undefined
  context: CanvasRenderingContext2D

  constructor(context: CanvasRenderingContext2D) {
    this.context = context
    if (!!Engine[CONTEXT])
      throw new Error(
        'Nengine only supports using 1 canvas, and only 1 active engine.',
      )
    Engine[CONTEXT] = context
    context.canvas.addEventListener('mousemove', (event) => {
      const rect = context.canvas.getBoundingClientRect()
      Engine[MOUSE].x = event.clientX - rect.left
      Engine[MOUSE].y = event.clientY - rect.top
    })
    context.canvas.addEventListener(
      'mousedown',
      (event) => (Engine[MOUSE].buttons = event.buttons),
    )
    context.canvas.addEventListener(
      'mouseup',
      (event) => (Engine[MOUSE].buttons = event.buttons),
    )
    context.canvas.addEventListener(
      'wheel',
      (event) => {
        Engine[MOUSE].wheelX += event.deltaX
        Engine[MOUSE].wheelY += event.deltaY
      },
      { passive: true },
    )
    context.canvas.addEventListener('keydown', (event) => {
      if (event.code && !Engine[KEYS].pressed.includes(event.code as Key))
        Engine[KEYS].pressed.push(event.code as Key)
      Engine[KEYS].chars.push(event.key)
    })
    context.canvas.addEventListener('keyup', (event) => {
      if (event.code && Engine[KEYS].pressed.includes(event.code as Key))
        Engine[KEYS].pressed.splice(Engine[KEYS].pressed.indexOf(event.code as Key), 1)
    })
  }
  /**
   * Starts the engine with the provided game.
   * This activates the engine and starts the game loop.
   * If the provided game has an init function, that will be called
   * and will wait for completion until starting the game loop.
   */
  runGame(game: Game) {
    if (!game) throw panic('Invalid game')
    this.game = game
    if (!!this.game.load)
      this.game
        .load()
        .then(() => window.requestAnimationFrame(this.#tick.bind(this)))
    else window.requestAnimationFrame(this.#tick.bind(this))
  }

  #tick(timestamp: number) {
    if (!this.game) throw panic('Missing game')
    const delta = timestamp - this.prev
    this.prev = timestamp
    if (delta > 0) {
      this.game.update(delta)
      Engine[MOUSE].wheelX = 0
      Engine[MOUSE].wheelY = 0
      Engine[MOUSE].prevX = Engine[MOUSE].x
      Engine[MOUSE].prevY = Engine[MOUSE].y
      Engine[MOUSE].prevButtons = Engine[MOUSE].buttons
      Engine[KEYS].prev = Engine[KEYS].pressed
      Engine[KEYS].chars = []
    }
    this.context.reset()
    this.game.draw(this.context)
    if (Engine[PANIC] === true) return
    window.requestAnimationFrame(this.#tick.bind(this))
  }
}
