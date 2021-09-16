import { App, Stack, StackProps } from '@aws-cdk/core'
import { createProjectsTable } from './databases'
import { createProjectsApi, lambdaMap, createNodeLambdaFunction } from './api-gateway'
import { LambdaConfig, LambdaFuncs } from './interfaces'
import env from './env'

/**
 * Creates a Cloud Formation Stack in AWS
 * It contains the following Resources:
 * - Dynamo DB Table
 * - 6x Lambda TypeScript Functions
 * - API Gateway (2 resources, 6 methods)
 */
export class PhotoStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    /* PROJECTS DATABASE */
    const projectDdb = createProjectsTable(
      this,
      `${env.PROJECTS_TABLE_NAME}-${env.DEPLOY_ENV}`,
      env.DEPLOY_ENV === 'production'
    )

    /* LAMBDA FUNCTIONS */
    const lambdaFunctions = Object.entries(lambdaMap).reduce((
      acc: LambdaFuncs,
      [key, config]: [string, LambdaConfig]
    ): LambdaFuncs => {
      acc[key] = createNodeLambdaFunction(
        this,
        config.name,
        config.entry,
        config.handler
      )
      // Grant access to database
      projectDdb.grantReadWriteData(acc[key])
      return acc
    }, {})

    /* API GATEWAY */
    const projectApi = createProjectsApi(
      this,
      `${env.REST_API_ID}-${env.DEPLOY_ENV}`,
      `${env.REST_API_NAME}-${env.DEPLOY_ENV}`,
      lambdaFunctions
    )
  }
}
