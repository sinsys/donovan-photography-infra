import { Handler, Context } from 'aws-lambda'
import { ApiErrorCodes, IProjectGetRequest, ProcessError } from '@src/interfaces'
import { isValidString, ApiError, makeApiResponse, Log } from '@src/utils'

/**
 * Gets a project details
 * @param event - API Request
 */
export const getProject: Handler = async (event: IProjectGetRequest, _context: Context) => {
  try {
    Log(console.debug, '[PROJECT][CREATE][START]')
    const projectId = event?.id
    if (!isValidString(projectId)) {
      ApiError(ApiErrorCodes.BR, 'Invalid input', event)
    }

    Log(console.debug, '[PROJECT][CREATE][SUCCESS]')
    return makeApiResponse(
      201, `Successfully retrieved project details for ${projectId}`,
      {
        projectId,
        files: []
      }
    )
  } catch (err) {
    if (err instanceof ProcessError) {
      throw err
    }
    ApiError(ApiErrorCodes.ISE, 'There was an unknown error', err)
  }
}
