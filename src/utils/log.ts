import { inspect } from 'util'

/**
 * Logging function for application. Avoids verbose logs in production
 * @param func - Function to log with
 * @param message - Message to send
 * @param args - Additional data to inspect/log
 */
export const Log = (
  func = console.info,
  message: string,
  ...args: unknown[]
): void => {
  const argStrings = args.map((arg) =>
    typeof arg === 'object' || typeof arg === 'function'
      ? inspect(arg, false, null)
      : arg
  )
  func(message, ...argStrings)
}
