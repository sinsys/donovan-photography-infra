import { App, Stack, StackProps } from '@aws-cdk/core'
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda'
import { LambdaRestApi } from '@aws-cdk/aws-apigateway'
import { createProjectsTable } from './databases'
import env from './env'


export class PhotoStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    /* PROJECTS DATABASE */
    createProjectsTable(
      this,
      `${env.PROJECTS_TABLE_NAME}-${env.DEPLOY_ENV}`,
      env.DEPLOY_ENV === 'production'
    )

    /* LAMBDA FUNCTIONS */
    const getProject = new Function(
      this,
      'GetProject',
      {
        runtime: Runtime.NODEJS_14_X,
        code: Code.fromAsset('./dist/lambdas'),
        handler: 'project-get.getProject'
      }
    )

    /* API GATEWAY */
    const apiGateway = new LambdaRestApi(this, 'Endpoint', {
      handler: getProject
    })
  }
}
