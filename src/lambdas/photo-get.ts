import { Handler, Context } from 'aws-lambda'
import { ApiErrorCodes, IPhotoGetRequest, IPhotoGetResponse, ProcessError } from '../interfaces'
import { isValidString, ApiError, makeApiResponse, Log } from '../utils'

/**
 * Retrieves a single photo from storage
 * @param event - API Request
 * @returns - Resource ID for image in storage
 */
export const getPhoto: Handler = async (event: IPhotoGetRequest, _context: Context) => {
  try {
    Log(console.debug, '[PHOTO][GET][START]')
    const {
      photoId,
      id: projectId
    } = event?.pathParameters ?? {}

    if (!isValidString(photoId) || !isValidString(projectId)) {
      throw ApiError(ApiErrorCodes.BR, 'Invalid input', event)
    }

    Log(console.debug, '[PHOTO][GET][SUCCESS]')
    return makeApiResponse<IPhotoGetResponse>(
      200, `Successfully received photo ${photoId}`,
      { location: 'tbd' }
    )
  } catch (err) {
    if (err instanceof ProcessError) {
      throw err
    }
    throw ApiError(ApiErrorCodes.ISE, 'There was an unknown error', err)
  }
}
