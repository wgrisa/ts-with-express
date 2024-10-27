import supertest from 'supertest'

import { app } from '../app'

export const apiRequest = supertest(app)
