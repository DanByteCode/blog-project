import express from 'express'
import config from './config/variables.js'
import path from 'node:path'
import { fileURLToPath } from 'url'
import { initDatabase } from './config/database.js'
import { errorHandler } from './middlewares/error.js'
import { index } from './routes/index.js'
import { api } from './routes/api.js'
import cookieParser from 'cookie-parser'
import session from './middlewares/session.js'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
const dirname = path.dirname(fileURLToPath(import.meta.url))
initDatabase()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3200', credentials: true }))
app.use(morgan('dev'))
app.use(session)
app.use(express.static(path.join(dirname, '../client/user/dist')))

app.use('/api', api)
app.use('/', index)

app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log('Server online: http://localhost:' + config.PORT)
})
