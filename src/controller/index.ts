import { ErrorRequestHandler } from 'express'
import { Express } from 'express-serve-static-core'

import { errorController } from './middlewares/error-controller'
import { routes } from './routes'

export const loadRestApiRoutes = (app: Express) => {
  app.use('/api', routes)
  app.use(errorController as unknown as ErrorRequestHandler)
}
