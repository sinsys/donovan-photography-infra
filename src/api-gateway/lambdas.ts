import { Runtime } from '@aws-cdk/aws-lambda'
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'
import { PhotoStack } from '../infra-stack'
import { LambdaConfig } from '../interfaces'
import env from '../env'

const nodeJsFunctionProps = {
  bundling: {},
  runtime: Runtime.NODEJS_14_X
}

export const createNodeLambdaFunction = (
  stack: PhotoStack,
  name: string,
  entry: string,
  handler: string,
  isProd: boolean = false
): any => {
  return new NodejsFunction(stack, name, {
    entry,
    handler,
    ...nodeJsFunctionProps
  })
}

export const lambdaMap: {
  [key: string]: LambdaConfig
} = {
  getPhoto: {
    method: 'GET',
    name: `fn-photo-get-${env.DEPLOY_ENV}`,
    entry: 'src/lambdas/photo-get.ts',
    handler: 'getPhoto'
  },
  deletePhoto: {
    method: 'DELETE',
    name: `fn-photo-delete-${env.DEPLOY_ENV}`,
    entry: 'src/lambdas/photo-delete.ts',
    handler: 'deletePhoto'
  },
  getProject: {
    method: 'GET',
    name: `fn-project-get-${env.DEPLOY_ENV}`,
    entry: 'src/lambdas/photo-get.ts',
    handler: 'getPhoto'
  },
  deleteProject: {
    method: 'DELETE',
    name: `fn-project-delete-${env.DEPLOY_ENV}`,
    entry: 'src/lambdas/project-delete.ts',
    handler: 'deleteProject'
  },
  createProject: {
    method: 'POST',
    name: `fn-project-create-${env.DEPLOY_ENV}`,
    entry: 'src/lambdas/project-create.ts',
    handler: 'createProject'
  },
  updateProject: {
    method: 'PUT',
    name: `fn-project-update-${env.DEPLOY_ENV}`,
    entry: 'src/lambdas/project-update.ts',
    handler: 'updateProject'
  },
}
