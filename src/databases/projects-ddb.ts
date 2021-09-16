import { AttributeType, Table } from '@aws-cdk/aws-dynamodb'
import { RemovalPolicy } from '@aws-cdk/core'
import { PhotoStack } from '../infra-stack'

/**
 * Creates Table in Dynamo
 * @param stack - Stack to add database table to
 * @param ddbName - Name of database table
 * @param isProd - Conditional to apply stricter deployment rules
 * @returns - Table
 */
export const createProjectsTable = (
  stack: PhotoStack,
  ddbName: string,
  isProd = false
): Table => {
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
  isProd = false
): RemovalPolicy => {
  return isProd === true
    ? RemovalPolicy.RETAIN
    : RemovalPolicy.DESTROY
}