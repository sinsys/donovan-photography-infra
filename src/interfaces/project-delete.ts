/**
 * DELETE /projects/:id Request
 * Request to get photo links
 */
export interface IProjectDeleteRequest {
  id: string
}

/**
 * DELETE /projects/:id Response
 * Location granted to access pictures
 */
export interface IProjectDeleteResponse {
  code: number
  message: string
}
