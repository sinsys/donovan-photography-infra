/**
 * PUT /projects/:id Request
 * Request to get photo links
 */
export interface IProjectUpdateRequest {
  id: string
}

/**
 * PUT /projects/:id Response
 * Location granted to access pictures
 */
export interface IProjectUpdateResponse {
  bucketLocation: string
}
