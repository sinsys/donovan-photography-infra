import { AttributeType, Table } from '@aws-cdk/aws-dynamodb'
import { RemovalPolicy } from '@aws-cdk/core'
import { PhotoStack } from '../infra-stack'
import env from '../env'

/**
 * Creates Table in Dynamo
 * @param stack - Stack to add database table to
 * @param ddbName - Name of database table
 * @returns - Created Table class
 */
export const createProjectsTable = (stack: PhotoStack, ddbName: string, isProd: boolean): Table => {
  return new Table(stack, ddbName, {
    partitionKey: {
      name: 'PK',
      type: AttributeType.STRING
    },
    sortKey: {
      name: 'SK',
      type: AttributeType.STRING
    },
    tableName: ddbName,
    removalPolicy: setRemovalPolicy(isProd)
  })
}

/**
 * Sets removal policy for database table
 * @param isProd - Sets removal policy to retain if true
 * @returns { RemovalPolicy }
 */
export const setRemovalPolicy = (
  isProd: boolean = env.DEPLOY_ENV === 'production'
): RemovalPolicy => {
  return isProd === true
    ? RemovalPolicy.RETAIN
    : RemovalPolicy.DESTROY
}