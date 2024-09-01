export enum ConsoleResult {
  Normal,
  Info,
  Warn,
  Error,
}

export type ConsoleFunc = (args: string[]) => [ConsoleResult, string]

export const registered = new Map<string, ConsoleFunc>()

export function consoleRegister(name: string, fn: ConsoleFunc) {
  registered.set(name, fn)
}

export function runCommand(value: string): [ConsoleResult, string] {
  const split = value.split(" ")
  const name = split[0]
  const args = split.slice(1)
  const fn = registered.get(name);
  if (fn) return fn(args)
  return [ConsoleResult.Error, "Command " + name + " not registered"]
}
