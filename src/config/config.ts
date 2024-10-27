import dotenv from 'dotenv'
import rc from 'rc'

import { environments } from './environments'

dotenv.config()

const defaultConfig = {
  http: {
    host: '0.0.0.0',
    port: 3000,
  },
  logLevel: 'debug',
  env: process.env.NODE_ENV || environments.development,
  nodeClusterEnabled: false,
}

export const config: typeof defaultConfig = rc('basic_ts_with_express', defaultConfig)
