import express from 'express'
import { StatusCodes } from 'http-status-codes'

const router = express.Router()

router.get('/ping', (_req: express.Request, res: express.Response): void => {
    res.status(StatusCodes.OK).send('pong')
})

export const routes = router
