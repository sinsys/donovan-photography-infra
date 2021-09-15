import { ApiRequest } from '.'
/**
 * DELETE /projects/:id/:photoId Request
 * Request to delete photo links
 */
export interface IPhotoDeleteRequest extends ApiRequest<null> {
  pathParameters: {
    id: string
    photoId: string
  }
}
