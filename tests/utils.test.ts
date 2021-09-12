import { Log } from '../src/utils'
import { inspect } from 'util'

describe('utils', () => {
  describe('log', () => {
    it('logs correct strings with different data types', () => {
      // Arrange
      expect.hasAssertions()
      const expectedLogs = [
        'foo',
        inspect({ key: 'val' }, false, null),
        'bar'
      ]
      const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {})

      // Act
      Log(console.info, 'foo', { key: 'val' }, 'bar')

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(...expectedLogs)
      consoleSpy.mockRestore()
    })
  })
})
