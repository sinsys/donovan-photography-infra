import { App, Stack, StackProps } from '@aws-cdk/core'
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'
// Exporting
import { LambdaIntegration, IResource, MockIntegration, PassthroughBehavior } from '@aws-cdk/aws-apigateway'
import { createProjectsTable } from './databases'
import { createProjectsApi, lambdaMap, createNodeLambdaFunction } from './api-gateway'
import env from './env'
import { LambdaConfig, LambdaFuncs } from './interfaces'
import { addCorsOptions } from './api-gateway'

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
      // Grant access to table
      projectDdb.grantReadWriteData(acc[key])
      return acc
    }, {})

    /* API GATEWAY */
    const projectApi = createProjectsApi(
      this,
      `${env.REST_API_ID}-${env.DEPLOY_ENV}`,
      `${env.REST_API_NAME}-${env.DEPLOY_ENV}`,
      env.DEPLOY_ENV === 'production'
    )

    // Routes
    const projects = projectApi.root.addResource('projects')
    const singleProject = projects.addResource('{id}')
    const singlePhoto = singleProject.addResource('{photoId}')
    addCorsOptions(singleProject)
    addCorsOptions(singlePhoto)

    // Integrate the Lambda functions with the API Gateway resource
    singleProject.addMethod('GET', new LambdaIntegration(lambdaFunctions.getProject))
    singleProject.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteProject))
    singleProject.addMethod('POST', new LambdaIntegration(lambdaFunctions.createProject))
    singleProject.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updateProject))

    singlePhoto.addMethod('GET', new LambdaIntegration(lambdaFunctions.getPhoto))
    singlePhoto.addMethod('PUT', new LambdaIntegration(lambdaFunctions.deletePhoto))
  }
}
