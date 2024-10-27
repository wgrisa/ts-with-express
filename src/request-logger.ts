import { randomUUID } from 'crypto'
import { NextFunction, Request, Response } from 'express'
import httpContext from 'express-http-context'
import { Application } from 'express-serve-static-core'
import morgan from 'morgan'

export const initializeRequestLogger = (app: Application) => {
  setupRequestId(app)
  addMorganTokens()
  logOptionRequests(app)
  logNonOptionRequests(app)
}

const setupRequestId = (app: Application) => {
  app.use(httpContext.middleware)

  app.use((req: Request, res: Response, next: NextFunction) => {
    httpContext.set('reqId', randomUUID())
    next()
  })
}

const addMorganTokens = () => {
  morgan.token('id', () => {
    const reqId = httpContext.get('reqId')

    return reqId ? reqId.split('-')[0] : ''
  })
  morgan.token('json-body', (req: Request) => formatSensitiveData(req.originalUrl, req.body))
  morgan.token('json-query', (req: Request) => JSON.stringify(req.query))
}

const requestStamp = '[:date[iso] #:id]'

const filteredUrls = (url: string) => ['/api/ping'].includes(url)

const nonOptionRequests = (req: Request) => filteredUrls(req.originalUrl.toLowerCase()) || req.method !== 'OPTIONS'
const logOptionRequests = (app: Application) => {
  app.use(
    morgan(`${requestStamp} Completed :method :url for :remote-addr with :status in :response-time ms`, {
      skip: nonOptionRequests,
    }),
  )
}

const optionRequests = (req: Request) => filteredUrls(req.originalUrl.toLowerCase()) || req.method === 'OPTIONS'
const logNonOptionRequests = (app: Application) => {
  app.use(
    morgan(`${requestStamp} Started :method :url for :remote-addr Query: :json-query Body: :json-body`, {
      immediate: true,
      skip: optionRequests,
    }),
  )
  app.use(
    morgan(`${requestStamp} Completed :status in :response-time ms`, {
      skip: optionRequests,
    }),
  )
}

const formatSensitiveData = (originalUrl: string, data: unknown) => {
  const [, , domain, fourthRoutePart] = originalUrl.split('/')
  const baseRoute = fourthRoutePart?.toLowerCase().split('?').shift()

  const isSensitiveData = (baseRoute && ['issuances'].includes(baseRoute)) || (domain && ['global'].includes(domain))

  if (isSensitiveData) {
    return data
      ? JSON.stringify({ warning: 'THIS IS A SENSITIVE ROUTE. THE DATA HAS BEEN FILTERED!', keys: Object.keys(data) })
      : undefined
  }

  return JSON.stringify(data)
}
