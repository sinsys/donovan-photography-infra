import { ApiRequest, ProjectDetails } from '.'

/** Request to get photo links */
export interface IProjectCreateRequest extends ApiRequest<ProjectDetails> {}

/** Location granted to access pictures */
export interface IProjectCreateResponse {
  code: number
  message: string
}

