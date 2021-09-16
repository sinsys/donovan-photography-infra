import { Runtime } from '@aws-cdk/aws-lambda'
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'
import { PhotoStack } from '../infra-stack'
import { LambdaConfig } from '../interfaces'
import env from '../env'

/** Common Node Lambda properties */
const nodeJsFunctionProps = {
  bundling: {},
  runtime: Runtime.NODEJS_14_X,
}

/**
 * Creates bundled Node Lambda functions in the provided Stack
 * @param stack - Stack to add Lambda function to
 * @param name - Name of Lambda
 * @param entry - Entry point of Lambda code (.ts)
 * @param handler - Function name of Lambda code
 * @returns
 */
export const createNodeLambdaFunction = (
  stack: PhotoStack,
  name: string,
  entry: string,
  handler: string
): NodejsFunction => {
  return new NodejsFunction(stack, name, {
    entry,
    handler,
    ...nodeJsFunctionProps,
  })
}

/**
 * Config map when creating Lambdas
 */
export const lambdaMap: {
  [key: string]: LambdaConfig
} = {
  getPhoto: {
    method: 'GET',
    name: `fn-photo-get-${env.DEPLOY_ENV}`,
    entry: 'src/lambdas/photo-get.ts',
    handler: 'getPhoto',
  },
  deletePhoto: {
    method: 'DELETE',
    name: `fn-photo-delete-${env.DEPLOY_ENV}`,
    entry: 'src/lambdas/photo-delete.ts',
    handler: 'deletePhoto',
  },
  getProject: {
    method: 'GET',
    name: `fn-project-get-${env.DEPLOY_ENV}`,
    entry: 'src/lambdas/photo-get.ts',
    handler: 'getPhoto',
  },
  deleteProject: {
    method: 'DELETE',
    name: `fn-project-delete-${env.DEPLOY_ENV}`,
    entry: 'src/lambdas/project-delete.ts',
    handler: 'deleteProject',
  },
  createProject: {
    method: 'POST',
    name: `fn-project-create-${env.DEPLOY_ENV}`,
    entry: 'src/lambdas/project-create.ts',
    handler: 'createProject',
  },
  updateProject: {
    method: 'PUT',
    name: `fn-project-update-${env.DEPLOY_ENV}`,
    entry: 'src/lambdas/project-update.ts',
    handler: 'updateProject',
  },
}
