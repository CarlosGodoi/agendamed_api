import express from 'express'
import { env } from '.'

export const app = express()

app.set('jwtSecret', env.JWT_SECRET)
app.set('refreshTokenSecret', env.JWT_REFRESH_SECRET)
