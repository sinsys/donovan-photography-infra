import { ApiRequest, ProjectDetails } from '.'

/** Request to get photo links */
export type IProjectCreateRequest = ApiRequest<ProjectDetails>

/** Location granted to access pictures */
export interface IProjectCreateResponse {
  code: number
  message: string
}
