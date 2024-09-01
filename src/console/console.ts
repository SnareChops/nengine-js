import { Color } from '../color.js'
import { RawBounds } from '../bounds/index.js'
import { isKeyJustPressed, Key } from '../input/index.js'
import { Text, drawText } from '../fonts/index.js'
import { Entry } from './entry.js'
import { Context, createCanvas } from '../types/index.js'
import { ConsoleResult, runCommand } from './commands.js'
import { inputCapture } from '../input/index.js'
import { drawSprite, drawAt } from '../rendering/index.js'

const background = new Color(16, 16, 16, 255)
const dark = new Color(69, 69, 69, 255)
const mid = new Color(128, 128, 128, 255)
const light = new Color(193, 193, 193, 255)
const error = new Color(239, 167, 161, 255)
const good = new Color(128, 201, 144, 255)
const warn = new Color(167, 149, 93, 255)
const info = new Color(80, 203, 205, 255)
const cmd = new Color(117, 196, 228, 255)

class console extends RawBounds {
  visible: boolean = false
  key: Key | undefined
  history: string[] = []
  output: Text[] = []
  entry: Entry
  cursorImage: Context
  // entryText: Text
  start: Text
  image: Context

  constructor(w: number, h: number) {
    super(w, h)
    this.start = new Text(">", 0, 'monospace', dark)
    this.entry = new Entry(this.dx() - 20, 20, light)
    this.cursorImage = createCanvas(2, this.dy())
    this.image = createCanvas(...this.size())
  }
}

let state: console

export function init(key: Key) {
  state = new console(1920 - 400, 1080 - 200)
  state.key = key
  addResult(ConsoleResult.Info, "Nengine Console, `help` for more info")
  reposition()
  render()
}

function clear() {
  state.output = []
  reposition()
  render()
}

function addToHistory(command: string) {
  if (state.history.includes(command)) {
    for (const [i, c] of state.history.entries()) {
      if (c === command) {
        state.history.splice(i, 1)
        break
      }
    }
  }
  state.history.push(command)
}

function addCom(command: string) {
  const text = new Text("> " + command, 0, 'monospace', cmd)
  text.wrap(state.dx() - 10)
  text.setPos2(5, 0)
  addToOutput(text)
}

function addResult(status: ConsoleResult, result: string) {
  let clr: Color
  switch (status) {
    case ConsoleResult.Info:
      clr = info
    case ConsoleResult.Warn:
      clr = warn
    case ConsoleResult.Error:
      clr = error
    default:
      clr = mid
  }
  const text = new Text(result, 0, 'monospace', clr)
  text.wrap(state.dx() - 15)
  text.setPos2(10, 0)
  addToOutput(text)
}

function addToOutput(text: Text) {
  // Add the result text to `output`
  state.output.push(text)
  // Limit output buffer to only the most recent 50 messages
  if (state.output.length > 50) {
    state.output.splice(0, 1)
  }
}

export function update(delta: number) {
  if (!state.key) return
  const prev = state.visible
  // If console key pressed: show/hide
  if (isKeyJustPressed(state.key)) {
    state.visible = !state.visible
  }
  // If console was changed this frame: always capture all input
  if (prev != state.visible) {
    inputCapture()
  }
  // If console is not visible: exit early
  if (!state.visible) return
  // Capture ALL input when the console is visible
  inputCapture()
  // Run entry update
  const [updated, command] = state.entry.update(delta)
  // If command was submitted:
  if (command !== "") {
    // If was a clear command: Clear the console
    if (command === "clear") {
      clear()
      return
    }
    // Add the command to history
    addToHistory(command)
    // Attempt to run the command and capture the return text
    const [status, result] = runCommand(command)
    addCom(command)
    addResult(status, result)
    // output buffer has changed so we need to reposition all of the text
    reposition()
  }
  if (updated) {
    // If entry has been updated, redraw the console
    render()
  }
}

function reposition() {
  state.start.setPos2(5, state.dy() - 30)
  state.entry.setPos2(20, state.dy() - 30)
  let pointer = state.dy() - 60
  for (let i = state.output.length - 1; i >= 0; i--) {
    pointer -= state.output[i].dy()
    state.output[i].setPos2(state.output[i].x(), pointer)
    pointer -= 5
  }
}

function render() {
  state.image.reset()
  state.image.fillStyle = 'black'
  state.image.fill()
  drawText(state.image, state.start)
  drawSprite(state.image, state.entry, void 0)
  for (const out of state.output) {
    drawText(state.image, out)
  }
}

export function draw(screen: Context) {
  if (state.visible) {
    drawAt(screen, state.image.canvas, 200, 0)
  }
}
