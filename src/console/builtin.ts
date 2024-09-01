import * as debug from '../debug/index.js'
import { ConsoleResult, registered, consoleRegister } from './commands.js'

export function help(args: string[]): [ConsoleResult, string] {
  const names: string[] = []
  for (const key of registered.keys()) {
    names.push(key)
  }
  return [ConsoleResult.Normal, "Available commands: " + names.join(", ")]
}

export function echo(args: string[]): [ConsoleResult, string] {
  return [ConsoleResult.Error, args.join(" ")]
}

export function stats(args: string[]): [ConsoleResult, string] {
  if (args.length === 0) {
    return [ConsoleResult.Error, "Missing sub-command. Expected one of: show, hide"]
  }
  switch (args[0]) {
    case "show":
      debug.enableStats(true)
      return [ConsoleResult.Normal, "Displaying debug stats"]
    case "hide":
      debug.enableStats(false)
      return [ConsoleResult.Normal, "Removing debug stats"]
    default:
      return [ConsoleResult.Error, "Invalid sub-command. Expected one of: show, hide"]
  }
}

export function timers(args: string[]): [ConsoleResult, string] {
  if (args.length === 0) {
    return [ConsoleResult.Error, "Missing sub-command. Expected one of: show, hide"]
  }
  switch (args[0]) {
    case "show":
      debug.enableTimers(true)
      return [ConsoleResult.Normal, "Displaying timers"]
    case "hide":
      debug.enableTimers(false)
      return [ConsoleResult.Normal, "Removed timers"]
    default:
      return [ConsoleResult.Error, "Invalid sub-command. Expected one of: show, hide"]
  }
}

consoleRegister("help", help)
consoleRegister("echo", echo)
consoleRegister("stats", stats)
consoleRegister("timers", timers)

