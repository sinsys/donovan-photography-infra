import { reporter } from '@src/env'

describe('reportError', () => {
  it('returns undefined when no errors are thrown', async () => {
    expect.hasAssertions()
    const input = { errors: {}, env: { FOO: 'bar' } }
    const actual = reporter(input)
    expect(actual).toBeUndefined()
  })
  it('throws an error with all env variable errors', async () => {
    expect.hasAssertions()
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const expectedThrowMsg = '[ENV ERROR]: There is a problem with BAR, FOO'
    const expectedErrors = {
      BAR: Error('Bar is undefined'),
      FOO: Error('Foo is undefined')
    }
    const input = {
      errors: expectedErrors,
      env: {}
    }
    expect(() => reporter(input))
      .toThrow(expectedThrowMsg)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, expectedErrors)
    consoleSpy.mockRestore()
  })
})
