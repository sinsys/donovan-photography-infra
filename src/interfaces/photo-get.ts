import { ApiRequest } from '.'
/** Request to get photo links */
export interface IPhotoGetRequest extends ApiRequest<null> {
  pathParameters: {
    id: string
    photoId: string
  }
}

/** Response for photo links */
export interface IPhotoGetResponse {
  location: string
}
