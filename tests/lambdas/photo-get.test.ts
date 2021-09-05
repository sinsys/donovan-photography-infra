import { getPhoto } from '@src/lambdas/photo-get'
import { Context } from 'aws-lambda'
import { Mock } from 'moq.ts'
import { inspect } from 'util'
import { mockGetPhotoRequest, mockGetPhotoResponse } from '@tests/lambdas/__fixtures'

const mockContext = new Mock<Context>()

describe('getPhoto', () => {
  jest.spyOn(console, 'debug').mockImplementation(() => {})
  it('returns photo successfully', async () => {
    // Arrange
    expect.hasAssertions()
    const expected = mockGetPhotoResponse
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    // Act
    const result = await getPhoto(mockGetPhotoRequest, mockContext.object(), () => {})

    // Assert
    expect(result).toStrictEqual(expected)
    expect(consoleSpy).toHaveBeenCalledTimes(0)
    consoleSpy.mockRestore()
  })

  it('logs api error when error is known', async () => {
    // Arrange
    expect.hasAssertions()
    const input = {} as any
    const expected = '[Bad Request]: Invalid input'
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const expectedLogs = [
      expected,
      inspect({}, false, null)
    ]

    // Act / Assert
    await expect(getPhoto(input, mockContext.object(), () => {}))
      .rejects
      .toThrow(expected)
    expect(consoleSpy).toHaveBeenCalledWith(...expectedLogs)
    consoleSpy.mockRestore()
  })

  it('logs unknown error when error is unknown', async () => {
    // Arrange
    expect.hasAssertions()
    const expected = '[Internal Server Error]: There was an unknown error'
    const expectedError = new Error('whoops')
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const badFunc = jest.spyOn(console, 'debug').mockImplementationOnce(() => { throw expectedError })
    const expectedLogs = [
      expected,
      inspect(expectedError, false, null)
    ]

    // Act / Assert
    await expect(getPhoto(mockGetPhotoRequest, mockContext.object(), () => {}))
      .rejects
      .toThrow(expected)
    expect(consoleSpy).toHaveBeenCalledWith(...expectedLogs)
    consoleSpy.mockRestore()
    badFunc.mockRestore()
  })
})
