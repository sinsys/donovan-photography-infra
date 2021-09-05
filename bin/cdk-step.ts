#!/usr/bin/env node
import 'source-map-support/register'
import { App } from '@aws-cdk/core'
import { ProcessError } from '@src/interfaces'
import { PhotoStack } from '@src/handler'
import env from '@src/env'
import { inspect } from 'util'
import { Log } from '@src/utils'

export const buildApp = async (): Promise<void> => {
  try {
    console.debug('[STACK][CREATE][START]')
    const app = new App()
    const photoStack = new PhotoStack(app, env.APP_NAME)
    app.synth()
    console.debug('[STACK][CREATE][SUCCESS]', photoStack)
  } catch (err) {
    if (err instanceof ProcessError) {
      throw err
    }
    console.error(inspect(err, false, null))
    throw new Error('There was an unknown error')
  }
}

buildApp()
  .catch(err => Log(console.error, 'Unable to build app stack', err))
