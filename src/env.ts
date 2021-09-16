import { cleanEnv, str, ReporterOptions } from 'envalid'

/** Basic extention of built in error reporter - more human readable logs */
export const reporter = ({ errors }: ReporterOptions): void => {
  if (Object.keys(errors).length > 0) {
    throw new Error(
      `[ENV ERROR]: There is a problem with ${Object.keys(errors).join(', ')}`
    )
  }
}

/**
 * This is a sanitized, immutable version of our runtime environment
 */
const env = cleanEnv(
  process.env,
  {
    // BASE
    APP_NAME: str(),
    APP_CLIENT_ID: str(),

    // RESOURCES
    PHOTOS_TABLE_NAME: str(),
    USERS_TABLE_NAME: str(),
    PROJECTS_TABLE_NAME: str(),
    COGNITO_POOL_NAME: str(),
    COGNITO_POOL_ID: str(),
    COGNITO_DOMAIN: str(),
    COGNITO_DOMAIN_PREFIX: str(),
    REST_API_NAME: str(),
    REST_API_ID: str(),
    RESOURCE_SERVER_NAME: str(),
    RESOURCE_SERVER_ID: str(),

    // CONFIG
    REGION_BASE: str(),
    DEPLOY_ENV: str({
      choices: ['dev', 'test', 'production'],
    }),
  },
  {
    strict: true,
    reporter,
  }
)

export default env
