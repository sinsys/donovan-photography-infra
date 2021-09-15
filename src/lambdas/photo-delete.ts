import { Handler, Context } from 'aws-lambda'
import { ApiErrorCodes, IPhotoDeleteRequest, ProcessError } from '../interfaces'
import { isValidString, ApiError, makeApiResponse, Log } from '../utils'

/**
 * Deletes a single, high-quality photo from a project storage
 * @param event - API Request
 */
export const deletePhoto: Handler = async (event: IPhotoDeleteRequest, _context: Context) => {
  try {
    Log(console.debug, '[PHOTO][DELETE][START]')
    const {
      photoId,
      id: projectId
    } = event?.pathParameters ?? {}

    if (!isValidString(photoId) || !isValidString(projectId)) {
      throw ApiError(ApiErrorCodes.BR, 'Invalid input', event)
    }

    Log(console.debug, '[PHOTO][DELETE][SUCCESS]')
    return makeApiResponse(201, `Successfully deleted photo ${photoId}`)
  } catch (err) {
    if (err instanceof ProcessError) {
      throw err
    }
    throw ApiError(ApiErrorCodes.ISE, 'There was an unknown error', err)
  }
}
