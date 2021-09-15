import { ApiRequest } from '.'
/**
 * GET /projects/:id/:photoId Request
 * Request to get photo links
 */
export interface IPhotoGetRequest extends ApiRequest<null> {
  pathParameters: {
    id: string
    photoId: string
  }
}

/**
 * GET /projects/:id/:photoId Response
 * Location granted to access pictures
 */
export interface IPhotoGetResponse {
  location: string
}
