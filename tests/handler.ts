import { getPhoto } from '@src/handler'
import { Context } from 'aws-lambda'
import { Mock } from 'moq.ts'
const mockContext = new Mock<Context>()

describe('who tests the tests?', () => {
  it('can run a test', async () => {
    // Arrange
    expect.hasAssertions()

    // Act
    const result = await getPhoto({ photoId: 'mock-photo-id' }, mockContext.object(), () => {})

    // Assert
    expect(result).toBe('mock-photo-id')
  })
})
