import { expect as expectCDK, haveResource } from '@aws-cdk/assert'
import { App } from 'aws-cdk-lib'
import { PhotoStack } from '../src/infra-stack'
import env from '../src/env'

describe('resources', () => {
  it('creates projects database', () => {
    // Arrange
    expect.hasAssertions()
    const app = new App()
    // Act
    const stack = new PhotoStack(app, `${env.APP_NAME}-${env.DEPLOY_ENV}`)
    // Assert
    expectCDK(stack).to(haveResource('AWS::DynamoDB::Table'))
    expect(stack).toBeInstanceOf(PhotoStack)
  })
})
