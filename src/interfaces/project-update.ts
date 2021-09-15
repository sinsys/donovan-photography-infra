import { ApiRequest, ProjectDetails } from '.'
/** Request to get photo links */
export interface IProjectUpdateRequest extends ApiRequest<ProjectDetails> {
  pathParameters: {
    id: string
  }
}

/** Location granted to access pictures */
export interface IProjectUpdateResponse {
  bucketLocation: string
}
