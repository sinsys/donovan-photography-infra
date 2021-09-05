/**
 * Error codes for specific xxx API responses
 */
export enum ApiErrorCodes {
  BR = 'Bad Request', // 400
  NF = 'Not Found', // 404
  UA = 'Unauthorized', // 403
  ISE = 'Internal Server Error' // 500
}

/**
 * Custom error to ensure exception flows normally to the end of the stack
 */
export class ProcessError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ProcessError'
  }
}
