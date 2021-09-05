import { Handler, Context } from 'aws-lambda'
import { ApiErrorCodes, IProjectCreateRequest, ProcessError } from '@src/interfaces'
import { isValidString, ApiError, makeApiResponse, Log } from '@src/utils'

/**
 * Creates a new project from a collection of photos and metadata
 * @param event - API Request
 */
export const createProject: Handler = async (event: IProjectCreateRequest, _context: Context) => {
  try {
    Log(console.debug, '[PROJECT][CREATE][START]')
    const name = event?.name
    if (!isValidString(name)) {
      ApiError(ApiErrorCodes.BR, 'Invalid input', event)
    }

    Log(console.debug, '[PROJECT][CREATE][SUCCESS]')
    return makeApiResponse(
      201, `Successfully created project ${name}`
    )
  } catch (err) {
    if (err instanceof ProcessError) {
      throw err
    }
    ApiError(ApiErrorCodes.ISE, 'There was an unknown error', err)
  }
}
