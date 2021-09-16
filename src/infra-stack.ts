import { App, Stack, StackProps } from '@aws-cdk/core'
import { UserPool, CfnUserPoolResourceServer } from '@aws-cdk/aws-cognito'
import { createProjectsTable } from './databases'
import {
  createProjectsApi,
  lambdaMap,
  createNodeLambdaFunction,
} from './api-gateway'
import { LambdaConfig, LambdaFuncs } from './interfaces'
import env from './env'
import { Log } from '../src/utils'

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

    /* COGNITO USER POOL */
    const userPool = new UserPool(
      this,
      `${env.COGNITO_POOL_ID}-${env.DEPLOY_ENV}`,
      {
        userPoolName: `${env.COGNITO_POOL_NAME}-${env.DEPLOY_ENV}`,
        signInAliases: {
          email: true,
        },
      }
    )

    const resourceServer = new CfnUserPoolResourceServer(
      this,
      `${env.RESOURCE_SERVER_ID}-${env.DEPLOY_ENV}`,
      {
        identifier: 'https://resource-server/',
        name: `${env.RESOURCE_SERVER_NAME}-${env.DEPLOY_ENV}`,
        userPoolId: userPool.userPoolId,
        scopes: [
          {
            scopeDescription: 'projectsApi',
            scopeName: 'useProjectsApi',
          },
        ],
      }
    )

    userPool.addClient(`${env.APP_CLIENT_ID}-${env.DEPLOY_ENV}`, {
      generateSecret: true,
      oAuth: {
        flows: {
          clientCredentials: true,
        },
        scopes: [], // Todo
      },
    })

    userPool.addDomain(`${env.COGNITO_DOMAIN}-${env.DEPLOY_ENV}`, {
      cognitoDomain: {
        domainPrefix: `${env.COGNITO_DOMAIN_PREFIX}-${env.DEPLOY_ENV}`,
      },
    })
    /* PROJECTS DATABASE */
    const projectDdb = createProjectsTable(
      this,
      `${env.PROJECTS_TABLE_NAME}-${env.DEPLOY_ENV}`,
      env.DEPLOY_ENV === 'production'
    )

    /* LAMBDA FUNCTIONS */
    const lambdaFunctions = Object.entries(lambdaMap).reduce(
      (
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
      },
      {}
    )

    /* API GATEWAY */
    const projectApi = createProjectsApi(
      this,
      `${env.REST_API_ID}-${env.DEPLOY_ENV}`,
      `${env.REST_API_NAME}-${env.DEPLOY_ENV}`,
      lambdaFunctions
    )
    Log(
      console.debug,
      'Orphaned resources',
      typeof resourceServer,
      typeof projectApi
    )
  }
}
