import { updateProject } from '../../src/lambdas/project-update'
import { Context } from 'aws-lambda'
import { Mock } from 'moq.ts'
import { inspect } from 'util'
import { mockUpdateProjectRequest, mockUpdateProjectResponse } from './__fixtures'

const mockContext = new Mock<Context>()

describe('updateProject', () => {
  jest.spyOn(console, 'debug').mockImplementation(() => {})
  it('updates project successfully', async () => {
    // Arrange
    expect.hasAssertions()
    const expected = mockUpdateProjectResponse
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    // Act
    const result = await updateProject(mockUpdateProjectRequest, mockContext.object(), () => {})

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
    await expect(updateProject(input, mockContext.object(), () => {}))
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
    const badFunc = jest.spyOn(console, 'debug').mockImplementation(() => { throw expectedError })
    const expectedLogs = [
      expected,
      inspect(expectedError, false, null)
    ]

    // Act / Assert
    await expect(updateProject(mockUpdateProjectRequest, mockContext.object(), () => {}))
      .rejects
      .toThrow(expected)
    expect(consoleSpy).toHaveBeenCalledWith(...expectedLogs)
    consoleSpy.mockRestore()
    badFunc.mockRestore()
  })
})
