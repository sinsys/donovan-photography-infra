
import { ApiErrorCodes, ApiResponse, ResponseCodes, ProcessError } from '@src/interfaces'
import { inspect } from 'util'

export const isValidString = (it: unknown): it is string => {
  return it != null && typeof it === 'string' && it.trim().length !== 0
}

export const Log = (func: Function, message: string, ...args: any[]): void => {
  const argStrings = args.map(arg =>
    typeof arg === 'object' || typeof arg === 'function'
      ? inspect(arg, false, null)
      : arg
  )
  func(message, ...argStrings)
}

export const ApiError = (code: ApiErrorCodes, message: string, ...args: any[]): void => {
  const errMsg = `[${code}]: ${message}`
  Log(console.error, errMsg, ...args)
  throw new ProcessError(`[${code}]: ${message}`)
}

export const makeApiResponse = <T>(code: ResponseCodes, message: string, data?: T): ApiResponse<T> => {
  return {
    code,
    message,
    ...data != null && ({ data })
  }
}
