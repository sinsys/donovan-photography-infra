import { Handler, Context } from 'aws-lambda'
import { ApiErrorCodes, IProjectDeleteRequest, ProcessError } from '../interfaces'
import { isValidString, ApiError, makeApiResponse, Log } from '../utils'

/**
 * Deletes a project
 * @param event - API Request
 */
export const deleteProject: Handler = async (event: IProjectDeleteRequest, _context: Context) => {
  try {
    Log(console.debug, '[PROJECT][DELETE][START]')
    const projectId = event?.id
    if (!isValidString(projectId)) {
      throw ApiError(ApiErrorCodes.BR, 'Invalid input', event)
    }

    Log(console.debug, '[PROJECT][DELETE][SUCCESS]')
    return makeApiResponse(
      201, `Successfully deleted project ${projectId}`
    )
  } catch (err) {
    if (err instanceof ProcessError) {
      throw err
    }
    throw ApiError(ApiErrorCodes.ISE, 'There was an unknown error', err)
  }
}
