import { ApiRequest } from '.'

/** Request to get project details */
export interface IProjectGetRequest extends ApiRequest<null> {
  pathParameters: {
    id: string
  }
}

/** Details about a project */
export interface IProjectGetResponse {
  projectId: string
  files: any[]
}
