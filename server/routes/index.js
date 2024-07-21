import { Router } from 'express'
import path from 'node:path'
import { fileURLToPath } from 'url'

export const index = Router()
const dirname = path.dirname(fileURLToPath(import.meta.url))
index.get('*', (req, res) => res.sendFile(path.join(dirname, '../../client/user/dist', 'index.html')))
