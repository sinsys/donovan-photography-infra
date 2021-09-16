import {
  ApiErrorCodes,
  ApiResponse,
  ResponseCodes,
  ProcessError,
} from '../interfaces'
import { Log } from './log'

/**
 * Custom API Error handler
 * @param code - Status code to throw
 * @param message - Message to send
 * @param args - Additional data to inspect/log
 * @returns - Known error code (for proper error code handling)
 */
export const ApiError = (
  code: ApiErrorCodes,
  message: string,
  ...args: any[]
): ProcessError => {
  const errMsg = `[${code}]: ${message}`
  Log(console.error, errMsg, ...args)
  return new ProcessError(`[${code}]: ${message}`)
}

/**
 * Custom API response builder
 * @param statusCode - Status code to send
 * @param message - Message to send
 * @param body - Body to send as JSON
 * @returns - Custom API Response
 */
export const makeApiResponse = <T>(
  statusCode: ResponseCodes,
  body: T
): ApiResponse => {
  return {
    statusCode,
    headers: {},
    isBase64Encoded: false,
    body: JSON.stringify(body),
  }
}
