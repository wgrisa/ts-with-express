import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

import { config } from './config/config'
import { environments } from './config/environments'
import { loadRestApiRoutes } from './controller'
import { initializeRequestLogger } from './request-logger'

const app = express()

app.use(cors())
app.use(helmet())

if (config.env !== environments.test) {
  initializeRequestLogger(app)
}

if (config.env === environments.production) {
  const minutesToKeepRequestsInMemory = 15 * 60 * 1000 // 15 minutes
  const requestsPerWindowMs = 100 // limit each IP to X requests per windowMs

  const apiLimiter = rateLimit({
    windowMs: minutesToKeepRequestsInMemory,
    max: requestsPerWindowMs,
  })

  app.use(apiLimiter)
}

loadRestApiRoutes(app)

export { app }
