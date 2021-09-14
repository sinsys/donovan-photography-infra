import { setRemovalPolicy } from '../../src/databases/projects-ddb'
import { RemovalPolicy } from '@aws-cdk/core'

describe('database', () => {
  describe('removal policy', () => {
    it.each`
      input | output
      ${undefined} | ${RemovalPolicy.DESTROY}
      ${'unknown'} | ${RemovalPolicy.DESTROY}
      ${false} | ${RemovalPolicy.DESTROY}
      ${true} | ${RemovalPolicy.RETAIN}
    `('should return $input for $output', ({ input, output }) => {
      // Arrange
      const expected = output
      // Act
      const actual = setRemovalPolicy(input)
      // Assert
      expect(actual).toStrictEqual(expected)
    })
  })
})
