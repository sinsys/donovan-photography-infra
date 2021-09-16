import { App, RemovalPolicy } from '@aws-cdk/core'
import { Table } from '@aws-cdk/aws-dynamodb'
import {
  setRemovalPolicy,
  createProjectsTable,
} from '../../src/databases/projects-ddb'
import { PhotoStack } from '../../src/infra-stack'
import env from '../../src/env'

describe('database', () => {
  describe('removal policy', () => {
    it.each`
      input        | output
      ${undefined} | ${RemovalPolicy.DESTROY}
      ${'unknown'} | ${RemovalPolicy.DESTROY}
      ${false}     | ${RemovalPolicy.DESTROY}
      ${true}      | ${RemovalPolicy.RETAIN}
    `('should return $input for $output', ({ input, output }) => {
      // Arrange
      const expected = output
      // Act
      const actual = setRemovalPolicy(input)
      // Assert
      expect(actual).toStrictEqual(expected)
    })
  })
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
