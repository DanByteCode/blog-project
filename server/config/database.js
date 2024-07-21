import mongoose from 'mongoose'
import config from './variables.js'

export function initDatabase () {
  mongoose.set('strictQuery', false)
  mongoose.connect(config.DATABASE)
    .then(() => {
      console.log('Database connected')
    }).catch((err) => {
      console.log(err.message)
    })
}
