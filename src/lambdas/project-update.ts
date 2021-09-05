import { Handler, Context } from 'aws-lambda'
import { ApiErrorCodes, IProjectUpdateRequest, ProcessError } from '@src/interfaces'
import { isValidString, ApiError, makeApiResponse, Log } from '@src/utils'

/**
 * Updates a project details
 * @param event - API Request
 */
export const updateProject: Handler = async (event: IProjectUpdateRequest, _context: Context) => {
  try {
    Log(console.debug, '[PROJECT][UPDATE][START]')
    const projectId = event?.id
    if (!isValidString(projectId)) {
      ApiError(ApiErrorCodes.BR, 'Invalid input', event)
    }

    Log(console.debug, '[PROJECT][UPDATE][SUCCESS]')
    return makeApiResponse(
      201, `Successfully updated project details for ${projectId}`
    )
  } catch (err) {
    if (err instanceof ProcessError) {
      throw err
    }
    ApiError(ApiErrorCodes.ISE, 'There was an unknown error', err)
  }
}
