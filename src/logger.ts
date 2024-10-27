import { dump } from 'dumper.js'
import winston from 'winston'
import Transport from 'winston-transport'

import { config } from './config/config'
import { environments } from './config/environments'

class ObjectDumpTransport extends Transport {
  log(info: { level: string; message: unknown }, next: () => void) {
    const dumpObject = info.level === 'debug'

    if (dumpObject) {
      dump(info.message)
    }

    next()
  }
}

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.json()),
  level: config.logLevel,
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
})

if (config.env !== environments.production) {
  logger.add(new ObjectDumpTransport())
}

export { logger }
