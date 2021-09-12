import { Stack, Construct, StackProps } from '@aws-cdk/core'
import { createProjectsDatabase } from './databases'

export class PhotoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    createProjectsDatabase(this, 'projects-ddb')

  }
}
