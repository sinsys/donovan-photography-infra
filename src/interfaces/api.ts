export type ResponseCodes = 200 | 201 | 203 | 400 | 404 | 500
export interface ApiResponse<T> {
  code: ResponseCodes
  message: string
  data?: T
}
