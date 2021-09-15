import { RestApi, IResource, MockIntegration, PassthroughBehavior } from '@aws-cdk/aws-apigateway'
import { LambdaIntegration } from '@aws-cdk/aws-apigateway'
import { PhotoStack } from '../infra-stack'
import { LambdaFuncs } from '../interfaces'

/**
 * Creates API Gateway
 * @param stack - Stack to add API Gateway to
 * @param id - ID of API Gateway
 * @param restApiName - Name of REST Api
 * @param lambdaFunctions - Custom Node Lambda function packages
 * @param isProd - Conditional to apply stricter deployment rules
 * @returns - API Gateway
 */
export const createProjectsApi = (
  stack: PhotoStack,
  id: string,
  restApiName: string,
  lambdaFunctions: LambdaFuncs,
  isProd: boolean = false
): RestApi => {
  const api = new RestApi(stack, id, { restApiName })
  const base = api.root.addResource('projects')

  // Exposed resources
  const singleProject = base.addResource('{id}')
  const singlePhoto = singleProject.addResource('{photoId}')
  addCorsOptions(singleProject)
  addCorsOptions(singlePhoto)

  singleProject.addMethod('GET', new LambdaIntegration(lambdaFunctions.getProject))
  singleProject.addMethod('DELETE', new LambdaIntegration(lambdaFunctions.deleteProject))
  singleProject.addMethod('POST', new LambdaIntegration(lambdaFunctions.createProject))
  singleProject.addMethod('PUT', new LambdaIntegration(lambdaFunctions.updateProject))
  
  singlePhoto.addMethod('GET', new LambdaIntegration(lambdaFunctions.getPhoto))
  singlePhoto.addMethod('PUT', new LambdaIntegration(lambdaFunctions.deletePhoto))
  return api
}

/**
 * Helper utility to add CORS options to endpoints
 * @param apiResource - API Gateway Resource
 */
export const addCorsOptions = (apiResource: IResource): void => {
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