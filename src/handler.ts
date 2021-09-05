import { Handler, Context } from 'aws-lambda'
import { Request } from '@src/interfaces'

export const getPhoto: Handler = async (event: Request, _context: Context) => {
  return event?.photoId
}
