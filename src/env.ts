import { cleanEnv, str, ReporterOptions } from 'envalid'

export const reporter = ({ errors }: ReporterOptions): void => {
  if (Object.keys(errors).length > 0) {
    console.error(errors)
    throw new Error(`[ENV ERROR]: There is a problem with ${Object.keys(errors).join(', ')}`)
  }
}

const env = cleanEnv(process.env, {
  FOO: str()
}, {
  strict: true,
  reporter
})

export default env
