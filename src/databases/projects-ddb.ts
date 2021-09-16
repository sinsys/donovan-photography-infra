import { AttributeType, Table } from '@aws-cdk/aws-dynamodb'
import { PhotoStack } from '../infra-stack'
import { setRemovalPolicy } from '../utils'
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
      type: AttributeType.STRING,
    },
    sortKey: {
      name: 'SK',
      type: AttributeType.STRING,
    },
    tableName: ddbName,
    removalPolicy: setRemovalPolicy(isProd),
  })
}
