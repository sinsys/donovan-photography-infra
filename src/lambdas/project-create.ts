import { Handler, Context } from 'aws-lambda'
import {
  ApiErrorCodes,
  IProjectCreateRequest,
  ProcessError,
} from '../interfaces'
import { isValidString, ApiError, makeApiResponse, Log } from '../utils'

/**
 * Creates a new project from a collection of photos and metadata
 * @param event - API Request
 */
export const createProject: Handler = async (
  event: IProjectCreateRequest,
  _context: Context
) => {
  try {
    Log(console.debug, '[PROJECT][CREATE][START]')
    const body = event?.body
    if (!isValidString(body?.name)) {
      throw ApiError(ApiErrorCodes.BR, 'Invalid input', event)
    }

    Log(console.debug, '[PROJECT][CREATE][SUCCESS]')
    return makeApiResponse(201, `Successfully created project ${body?.name}`)
  } catch (err) {
    if (err instanceof ProcessError) {
      throw err
    }
    throw ApiError(ApiErrorCodes.ISE, 'There was an unknown error', err)
  }
}
