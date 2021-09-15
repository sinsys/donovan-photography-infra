import { ApiRequest, ProjectDetails } from '.'

/**
 * POST /project Request
 * Request to get photo links
 */
export interface IProjectCreateRequest extends ApiRequest<ProjectDetails> {}

/**
 * POST /project Response
 * Location granted to access pictures
 */
export interface IProjectCreateResponse {
  code: number
  message: string
}

