import { inspect } from 'util'

export const Log = (func: Function, message: string, ...args: any[]): void => {
  const argStrings = args.map(arg =>
    typeof arg === 'object' || typeof arg === 'function'
      ? inspect(arg, false, null)
      : arg
  )
  func(message, ...argStrings)
}