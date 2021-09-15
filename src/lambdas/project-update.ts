import { Handler, Context } from 'aws-lambda'
import { ApiErrorCodes, IProjectUpdateRequest, ProcessError } from '../interfaces'
import { isValidString, ApiError, makeApiResponse, Log } from '../utils'

/**
 * Updates a project details
 * @param event - API Request
 */
export const updateProject: Handler = async (event: IProjectUpdateRequest, _context: Context) => {
  try {
    Log(console.debug, '[PROJECT][UPDATE][START]')
    const projectId = event?.pathParameters?.id
    if (!isValidString(projectId)) {
      throw ApiError(ApiErrorCodes.BR, 'Invalid input', event)
    }

    Log(console.debug, '[PROJECT][UPDATE][SUCCESS]')
    return makeApiResponse(
      201, `Successfully updated project details for ${projectId}`
    )
  } catch (err) {
    if (err instanceof ProcessError) {
      throw err
    }
    throw ApiError(ApiErrorCodes.ISE, 'There was an unknown error', err)
  }
}
