import { ApiErrorCodes, ApiResponse, ResponseCodes, ProcessError } from '../interfaces'
import { Log } from './log'

export const ApiError = (code: ApiErrorCodes, message: string, ...args: any[]): ProcessError => {
  const errMsg = `[${code}]: ${message}`
  Log(console.error, errMsg, ...args)
  return new ProcessError(`[${code}]: ${message}`)
}

export const makeApiResponse = <T>(statusCode: ResponseCodes, message: string, body?: T): ApiResponse<T> => {
  return {
    statusCode,
    headers: {},
    message,
    ...body != null && ({ body })
  }
}