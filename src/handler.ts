import { ProcessError } from '@src/interfaces'
import { inspect } from 'util'

import { IResource, LambdaIntegration, MockIntegration, PassthroughBehavior, RestApi } from '@aws-cdk/aws-apigateway'
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb'
import { Runtime } from '@aws-cdk/aws-lambda'
import { App, Stack, RemovalPolicy } from '@aws-cdk/core'
import { NodejsFunction, NodejsFunctionProps } from '@aws-cdk/aws-lambda-nodejs'
import { join } from 'path'
import env from '@src/env'

export const buildMe = async (): Promise<string> => {
  try {
    const app = new App()
    const stack = new ApiLambdaCrudDynamoDBStack(app, env.APP_NAME)
    console.info(stack)
    app.synth()
    return 'Successfully constructed architecture'
  } catch (err) {
    if (err instanceof ProcessError) {
      throw err
    }
    console.error(inspect(err, false, null))
    throw new Error('There was an unknown error')
  }
}

export class ApiLambdaCrudDynamoDBStack extends Stack {
  constructor (app: App, id: string) {
    super(app, id)

    const dynamoTable = new Table(this, 'items', {
      partitionKey: {
        name: 'itemId',
        type: AttributeType.STRING
      },
      tableName: 'items',

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
    const getPhotosAll = new NodejsFunction(this, 'getPhotosAll', {
      entry: join(__dirname, 'lambdas', 'project-get.ts'),
      ...nodeJsFunctionProps
    })
    const addProject = new NodejsFunction(this, 'addProject', {
      entry: join(__dirname, 'lambdas', 'project-add.ts'),
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
    dynamoTable.grantReadWriteData(getPhotosAll)
    dynamoTable.grantReadWriteData(addProject)
    dynamoTable.grantReadWriteData(updateProject)
    dynamoTable.grantReadWriteData(deleteProject)

    // Integrate the Lambda functions with the API Gateway resource
    const getAllIntegration = new LambdaIntegration(getPhoto)
    const createOneIntegration = new LambdaIntegration(getPhotosAll)
    const getOneIntegration = new LambdaIntegration(addProject)
    const updateOneIntegration = new LambdaIntegration(updateProject)
    const deleteOneIntegration = new LambdaIntegration(deleteProject)

    // Create an API Gateway resource for each of the CRUD operations
    const api = new RestApi(this, 'itemsApi', {
      restApiName: 'Items Service'
    })

    const items = api.root.addResource('items')
    items.addMethod('GET', getAllIntegration)
    items.addMethod('POST', createOneIntegration)
    addCorsOptions(items)

    const singleItem = items.addResource('{id}')
    singleItem.addMethod('GET', getOneIntegration)
    singleItem.addMethod('PATCH', updateOneIntegration)
    singleItem.addMethod('DELETE', deleteOneIntegration)
    addCorsOptions(singleItem)
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
