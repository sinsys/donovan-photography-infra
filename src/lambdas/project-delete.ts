import { Handler, Context } from 'aws-lambda'
import { ApiErrorCodes, IProjectDeleteRequest, ProcessError } from '@src/interfaces'
import { isValidString, ApiError, makeApiResponse, Log } from '@src/utils'

/**
 * Deletes a project
 * @param event - API Request
 */
export const deleteProject: Handler = async (event: IProjectDeleteRequest, _context: Context) => {
  try {
    Log(console.debug, '[PROJECT][DELETE][START]')
    const projectId = event?.id
    if (!isValidString(projectId)) {
      ApiError(ApiErrorCodes.BR, 'Invalid input', event)
    }

    Log(console.debug, '[PROJECT][DELETE][SUCCESS]')
    return makeApiResponse(
      201, `Successfully deleted project ${projectId}`
    )
  } catch (err) {
    if (err instanceof ProcessError) {
      throw err
    }
    ApiError(ApiErrorCodes.ISE, 'There was an unknown error', err)
  }
}
