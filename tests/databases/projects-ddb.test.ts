import { App } from 'aws-cdk-lib'
import { Table } from 'aws-cdk-lib/aws-dynamodb'
import { createProjectsTable } from '../../src/databases/projects-ddb'
import { PhotoStack } from '../../src/infra-stack'
import env from '../../src/env'

describe('database', () => {
  describe('createProjectsTable', () => {
    it('missing optional argument satisfies default value', () => {
      // Arrange
      expect.hasAssertions()
      const app = new App()
      const stack = new PhotoStack(app, `${env.APP_NAME}-${env.DEPLOY_ENV}`)
      // Act
      const result = createProjectsTable(stack, 'test-table-name')
      // Assert
      expect(result).toBeInstanceOf(Table)
    })
  })
})
