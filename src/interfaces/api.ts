export type ResponseCodes = 200 | 201 | 203 | 400 | 404 | 500
export interface ApiResponse<T> {
  statusCode: ResponseCodes
  headers: {
    [key: string]: string
  }
  message: string
  body?: T
}
