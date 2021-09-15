import { ApiRequest, ProjectDetails } from '.'
/**
 * PUT /projects/:id Request
 * Request to get photo links
 */
export interface IProjectUpdateRequest extends ApiRequest<ProjectDetails> {
  pathParameters: {
    id: string
  }
}

/**
 * PUT /projects/:id Response
 * Location granted to access pictures
 */
export interface IProjectUpdateResponse {
  bucketLocation: string
}
