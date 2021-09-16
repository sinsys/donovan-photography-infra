import { inspect } from 'util'

/**
 *
 * @param func - Function to log with
 * @param message - Message to send
 * @param args - Additional data to inspect/log
 */
export const Log = (func: Function, message: string, ...args: any[]): void => {
  const argStrings = args.map((arg) =>
    typeof arg === 'object' || typeof arg === 'function'
      ? inspect(arg, false, null)
      : arg
  )
  func(message, ...argStrings)
}
