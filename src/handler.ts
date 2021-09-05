import { IResource, LambdaIntegration, MockIntegration, PassthroughBehavior, RestApi } from '@aws-cdk/aws-apigateway'
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb'
import { Runtime } from '@aws-cdk/aws-lambda'
import { App, Stack, RemovalPolicy } from '@aws-cdk/core'
import { NodejsFunction, NodejsFunctionProps } from '@aws-cdk/aws-lambda-nodejs'
import { join } from 'path'
import env from '@src/env'

export class PhotoStack extends Stack {
  constructor (app: App, id: string) {
    super(app, id)

    const dynamoTable = new Table(this, 'projects', {
      partitionKey: {
        name: 'projectId',
        type: AttributeType.STRING
      },
      tableName: 'projects',

      /**
       *  The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
       * the new table, and it will remain in your account until manually deleted. By setting the policy to
       * DESTROY, cdk destroy will delete the table (even if it has data in it)
       */
      removalPolicy: RemovalPolicy.DESTROY // NOT recommended for production code
    })

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: [
          'aws-sdk' // Use the 'aws-sdk' available in the Lambda runtime
        ]
      },
      depsLockFilePath: join(__dirname, 'lambdas', 'package-lock.json'),
      environment: {
        PRIMARY_KEY: 'itemId',
        TABLE_NAME: dynamoTable.tableName
      },
      runtime: Runtime.NODEJS_14_X
    }

    // Create a Lambda function for each of the CRUD operations
    const getPhoto = new NodejsFunction(this, 'getPhoto', {
      entry: join(__dirname, 'lambdas', 'photo-get.ts'),
      ...nodeJsFunctionProps
    })
    const deletePhoto = new NodejsFunction(this, 'deletePhoto', {
      entry: join(__dirname, 'lambdas', 'photo-delete.ts'),
      ...nodeJsFunctionProps
    })
    const getProject = new NodejsFunction(this, 'getProject', {
      entry: join(__dirname, 'lambdas', 'project-get.ts'),
      ...nodeJsFunctionProps
    })
    const createProject = new NodejsFunction(this, 'createProject', {
      entry: join(__dirname, 'lambdas', 'project-create.ts'),
      ...nodeJsFunctionProps
    })
    const updateProject = new NodejsFunction(this, 'updateProject', {
      entry: join(__dirname, 'lambdas', 'project-update.ts'),
      ...nodeJsFunctionProps
    })
    const deleteProject = new NodejsFunction(this, 'deleteProject', {
      entry: join(__dirname, 'lambdas', 'project-delete.ts'),
      ...nodeJsFunctionProps
    })

    // Grant the Lambda function read access to the DynamoDB table
    dynamoTable.grantReadWriteData(getPhoto)
    dynamoTable.grantReadWriteData(deletePhoto)
    dynamoTable.grantReadWriteData(getProject)
    dynamoTable.grantReadWriteData(createProject)
    dynamoTable.grantReadWriteData(updateProject)
    dynamoTable.grantReadWriteData(deleteProject)

    // Integrate the Lambda functions with the API Gateway resource
    const getPhotoIntegration = new LambdaIntegration(getPhoto)
    const deletePhotoIntegration = new LambdaIntegration(deletePhoto)
    const getProjectIntegration = new LambdaIntegration(getProject)
    const createProjectIntegration = new LambdaIntegration(createProject)
    const updateProjectIntegration = new LambdaIntegration(updateProject)
    const deleteProjectIntegration = new LambdaIntegration(deleteProject)

    // Create an API Gateway resource for each of the CRUD operations
    const api = new RestApi(this, env.REST_API_NAME, {
      restApiName: 'Projects Service'
    })

    const projects = api.root.addResource('projects')
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

export function addCorsOptions (apiResource: IResource): void {
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
