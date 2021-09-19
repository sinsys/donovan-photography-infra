import { App, Stack, StackProps, CfnOutput } from 'aws-cdk-lib'
import {
  UserPool,
  ClientAttributes,
  StringAttribute,
  UserPoolClient,
  UserPoolClientIdentityProvider,
} from 'aws-cdk-lib/aws-cognito'
// import { HttpUserPoolAuthorizer } from '@aws-cdk/aws-apigatewayv2-authorizers'
// import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations'
import { createProjectsTable } from './databases'
import {
  createProjectsApi,
  lambdaMap,
  createNodeLambdaFunction,
} from './api-gateway'
import { setAccountRecovery, setRemovalPolicy } from '../src/utils'
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

    /* COGNITO USER POOL */
    const userPool = new UserPool(this, 'userpool', {
      userPoolName: 'my-user-pool',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        isAdmin: new StringAttribute({ mutable: true }),
      },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: false,
        requireSymbols: false,
      },
      accountRecovery: setAccountRecovery(env.DEPLOY_ENV === 'production'),
      removalPolicy: setRemovalPolicy(env.DEPLOY_ENV === 'production'),
    })

    // 👇 User Pool Client attributes
    const standardCognitoAttributes = {
      givenName: true,
      familyName: true,
      email: true,
      emailVerified: true,
      phoneNumber: true,
      phoneNumberVerified: true,
    }

    const clientReadAttributes = new ClientAttributes()
      .withStandardAttributes(standardCognitoAttributes)
      .withCustomAttributes(...['isAdmin'])

    const clientWriteAttributes = new ClientAttributes().withStandardAttributes(
      {
        ...standardCognitoAttributes,
        emailVerified: false,
        phoneNumberVerified: false,
      }
    )

    const userPoolClient = new UserPoolClient(this, 'userpool-client', {
      userPool,
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userSrp: true,
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
      readAttributes: clientReadAttributes,
      writeAttributes: clientWriteAttributes,
    })

    // Outputs
    new CfnOutput(this, 'userPoolId', {
      value: userPool.userPoolId,
    })
    new CfnOutput(this, 'userPoolClientId', {
      value: userPoolClient.userPoolClientId,
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
    createProjectsApi(
      this,
      `${env.REST_API_ID}-${env.DEPLOY_ENV}`,
      `${env.REST_API_NAME}-${env.DEPLOY_ENV}`,
      lambdaFunctions
    )

    // 👇 create the Authorizer
    // const authorizer = new HttpUserPoolAuthorizer({
    //   userPool,
    //   userPoolClient,
    //   identitySource: ['$request.header.Authorization'],
    // });
  }
}
