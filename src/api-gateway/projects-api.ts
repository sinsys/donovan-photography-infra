import { RestApi, IResource, MockIntegration, PassthroughBehavior } from '@aws-cdk/aws-apigateway'
import { PhotoStack } from '../infra-stack'

import env from '../env'

export const createProjectsApi = (stack: PhotoStack, id: string, restApiName: string, isProd: boolean = false): RestApi => {
  return new RestApi(stack, id, { restApiName })
}

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