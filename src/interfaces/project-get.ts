import { ApiRequest } from '.'

/**
 * GET /projects/:id Request
 * Request to get project details
 */
export interface IProjectGetRequest extends ApiRequest<null> {
  pathParameters: {
    id: string
  }
}

/**
 * GET /projects/:id Response
 * Details about a project
 */
export interface IProjectGetResponse {
  projectId: string
  files: any[]
}
