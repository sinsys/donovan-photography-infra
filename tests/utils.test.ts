import { RemovalPolicy } from 'aws-cdk-lib'
import { AccountRecovery } from 'aws-cdk-lib/aws-cognito'
import { Log, setRemovalPolicy, setAccountRecovery } from '../src/utils'
import { inspect } from 'util'

describe('utils', () => {
  describe('log', () => {
    it('logs correct strings with different data types', () => {
      // Arrange
      expect.hasAssertions()
      const expectedLogs = ['foo', inspect({ key: 'val' }, false, null), 'bar']
      const consoleSpy = jest
        .spyOn(console, 'info')
        .mockImplementation(() => '')

      // Act
      Log(console.info, 'foo', { key: 'val' }, 'bar')

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(...expectedLogs)
      consoleSpy.mockRestore()
    })
    it('defaults to console.info', () => {
      // Arrange
      expect.hasAssertions()
      const expectedLogs = ['foo', inspect({ key: 'val' }, false, null), 'bar']
      const consoleSpy = jest
        .spyOn(console, 'info')
        .mockImplementation(() => '')

      // Act
      Log(undefined, 'foo', { key: 'val' }, 'bar')

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(...expectedLogs)
      consoleSpy.mockRestore()
    })
  })
  describe('setAccountRecovery', () => {
    it.each`
      input        | output
      ${undefined} | ${AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA}
      ${'unknown'} | ${AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA}
      ${false}     | ${AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA}
      ${true}      | ${AccountRecovery.EMAIL_ONLY}
    `('should return $input for $output', ({ input, output }) => {
      // Arrange
      const expected = output
      // Act
      const actual = setAccountRecovery(input)
      // Assert
      expect(actual).toStrictEqual(expected)
    })
  })
  describe('setRemovalPolicy', () => {
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
})
