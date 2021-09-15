import { App, Stack, StackProps } from '@aws-cdk/core'
import { Runtime } from '@aws-cdk/aws-lambda'
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'
import { LambdaIntegration, RestApi, IResource, MockIntegration, PassthroughBehavior } from '@aws-cdk/aws-apigateway'
import { createProjectsTable } from './databases'
import { join } from 'path'
import env from './env'


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
    const nodeJsFunctionProps = {
      bundling: {
        externalModules: ['aws-sdk']
      },
      runtime: Runtime.NODEJS_14_X
    }
  
    const getPhoto = new NodejsFunction(this, `fn-photo-get-${env.DEPLOY_ENV}`, {
      entry: 'src/lambdas/photo-get.ts',
      handler: 'getPhoto',
      ...nodeJsFunctionProps
    })
    const deletePhoto = new NodejsFunction(this, `fn-photo-delete-${env.DEPLOY_ENV}`, {
      entry: 'src/lambdas/photo-delete.ts',
      handler: 'deletePhoto',
      ...nodeJsFunctionProps
    })
    const getProject = new NodejsFunction(this, `fn-project-get-${env.DEPLOY_ENV}`, {
      entry: 'src/lambdas/project-get.ts',
      handler: 'getProject',
      ...nodeJsFunctionProps
    })
    const deleteProject = new NodejsFunction(this, `fn-project-delete-${env.DEPLOY_ENV}`, {
      entry: 'src/lambdas/project-delete.ts',
      handler: 'deleteProject',
      ...nodeJsFunctionProps
    })
    const createProject = new NodejsFunction(this, `fn-project-create-${env.DEPLOY_ENV}`, {
      entry: 'src/lambdas/project-create.ts',
      handler: 'createProject',
      ...nodeJsFunctionProps
    })
    const updateProject = new NodejsFunction(this, `fn-project-update-${env.DEPLOY_ENV}`, {
      entry: 'src/lambdas/project-update.ts',
      handler: 'updateProject',
      ...nodeJsFunctionProps
    })
    projectDdb.grantReadWriteData(getPhoto)
    projectDdb.grantReadWriteData(deletePhoto)
    projectDdb.grantReadWriteData(getProject)
    projectDdb.grantReadWriteData(createProject)
    projectDdb.grantReadWriteData(updateProject)
    projectDdb.grantReadWriteData(deleteProject)

    /* API GATEWAY */
    const apiGateway = new RestApi(this, `apigw-${env.DEPLOY_ENV}`, {
      restApiName: 'projects-service'
    })

    // Integrate the Lambda functions with the API Gateway resource
    const getPhotoIntegration = new LambdaIntegration(getPhoto)
    const deletePhotoIntegration = new LambdaIntegration(deletePhoto)
    const getProjectIntegration = new LambdaIntegration(getProject)
    const createProjectIntegration = new LambdaIntegration(createProject)
    const updateProjectIntegration = new LambdaIntegration(updateProject)
    const deleteProjectIntegration = new LambdaIntegration(deleteProject)

    const addCorsOptions = (apiResource: IResource): void => {
      apiResource.addMethod('OPTIONS', new MockIntegration({
        integrationResponses: [{
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
            'method.response.header.Access-Control-Allow-Origin': "'*'",
            'method.response.header.Access-Control-Allow-Credentials': "'false'",
            'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'"
          }
        }],
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestTemplates: {
          'application/json': '{"statusCode": 200}'
        }
      }), {
        methodResponses: [{
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Headers': true,
            'method.response.header.Access-Control-Allow-Methods': true,
            'method.response.header.Access-Control-Allow-Credentials': true,
            'method.response.header.Access-Control-Allow-Origin': true
          }
        }]
      })
    }

    const projects = apiGateway.root.addResource('projects')
    addCorsOptions(projects)

    const singleProject = projects.addResource('{id}')
    singleProject.addMethod('GET', getProjectIntegration)
    singleProject.addMethod('POST', createProjectIntegration)
    singleProject.addMethod('PUT', updateProjectIntegration)
    singleProject.addMethod('DELETE', deleteProjectIntegration)
    addCorsOptions(singleProject)

    const singlePhoto = singleProject.addResource('{photoId}')
    singlePhoto.addMethod('GET', getPhotoIntegration)
    singlePhoto.addMethod('POST', deletePhotoIntegration)
    addCorsOptions(singlePhoto)
  }
}
