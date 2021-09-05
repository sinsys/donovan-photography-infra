/**
 * POST /project Request
 * Request to get photo links
 */
export interface IProjectCreateRequest {
  name: string
  date: string
  files: string[]
}

/**
 * POST /project Response
 * Location granted to access pictures
 */
export interface IProjectCreateResponse {
  code: number
  message: string
}
