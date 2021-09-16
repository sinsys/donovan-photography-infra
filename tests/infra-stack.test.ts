import { expect as expectCDK, haveResource } from '@aws-cdk/assert'
import { App } from '@aws-cdk/core'
import { PhotoStack } from '../src/infra-stack'
import env from '../src/env'

describe('resources', () => {
  it('creates projects database', () => {
    // Arrange
    const app = new App()
    // Act
    const stack = new PhotoStack(app, `${env.APP_NAME}-${env.DEPLOY_ENV}`)
    // Assert
    expectCDK(stack).to(
      haveResource('AWS::DynamoDB::Table')
    )
  })
})
