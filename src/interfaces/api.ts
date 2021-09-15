export type ResponseCodes = 200 | 201 | 203 | 400 | 404 | 500
export interface ApiResponse<T> {
  statusCode: ResponseCodes
  headers: {
    [key: string]: string
  },
  message: string
  body?: T
}
export interface ApiRequest<T> {
  headers: any
  httpMethod: string
  body?: T
  queryStringParameters: {
    [key: string]: string
  }
  message: string
}
export interface ProjectDetails {
  name: string
  date: string
  files: string[]
}