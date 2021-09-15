import { ApiRequest } from '.'
/** Request to get photo links */
export interface IProjectDeleteRequest extends ApiRequest<null> {
  pathParameters: {
    id: string
  }
}

/** Location granted to access pictures */
export interface IProjectDeleteResponse {
  code: number
  message: string
}
