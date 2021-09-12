import { AttributeType, Table } from '@aws-cdk/aws-dynamodb'
import { RemovalPolicy } from '@aws-cdk/core'
import { PhotoStack } from '../infra-stack'

export const createProjectsDatabase = (stack: PhotoStack, ddbName: string): void => {
  new Table(stack, ddbName, {
    partitionKey: {
      name: 'projectId',
      type: AttributeType.STRING
    },
    tableName: ddbName,
    /**
     *  The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
     * the new table, and it will remain in your account until manually deleted. By setting the policy to
     * DESTROY, cdk destroy will delete the table (even if it has data in it)
     */
    removalPolicy: RemovalPolicy.DESTROY // NOT recommended for production code
  })
}
