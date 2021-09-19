import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

/** Status Codes */
export type ResponseCodes = 200 | 201 | 203 | 400 | 404 | 500

/** Api Response from API Gateway */
export interface ApiResponse {
  statusCode: ResponseCodes
  headers: {
    [key: string]: string
  }
  isBase64Encoded: boolean
  body: string
}

/** Api Request for API Gateway */
export interface ApiRequest<T> {
  headers: {
    [key: string]: string
  }
  httpMethod: string
  body?: T
  queryStringParameters: {
    [key: string]: string
  }
  message: string
}

/** Project details */
export interface ProjectDetails {
  name: string
  date: string
  files: string[]
}

/** Configuration for Lambda Functions */
export interface LambdaConfig {
  method: string
  name: string
  entry: string
  handler: string
}

/** Custom object for Node Lambda Functions */
export interface LambdaFuncs {
  [key: string]: NodejsFunction
}
