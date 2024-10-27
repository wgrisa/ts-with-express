import cluster from 'cluster'
import os from 'os'

import { app } from './app'
import { config } from './config/config'
import { logger } from './logger'

const startServer = (): void => {
  const server = app.listen(+config.http.port, config.http.host, () => {
    logger.info(`Server started at [ http://${config.http.host}:${config.http.port} ]`)
    logger.info(`Environment ${process.pid}: ${config.env}`)
  })

  const gracefulShutdown = (signal: string) => {
    logger.info(`${signal} received. Shutting down gracefully.`)
    server.close(() => {
      logger.info('Server closed')
      process.exit(0)
    })
  }

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
  process.on('SIGINT', () => gracefulShutdown('SIGINT'))
}

const startClusterServer = (): void => {
  if (!cluster.isPrimary) {
    return startServer()
  }

  logger.info(`Master ${process.pid} is running`)
  const numCPUs = os.cpus().length

  logger.info(`Forking ${numCPUs} clusters`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`Worker ${worker.process.pid} died (${signal || code}). Restarting...`)
    cluster.fork()
  })
}

if (config.nodeClusterEnabled) {
  startClusterServer()
} else {
  startServer()
}
