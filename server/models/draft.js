import { Schema, model } from 'mongoose'

const schema = new Schema({
  title: { type: String, maxLength: 128, default: 'No title' },
  body: { type: Array, required: true }
})

const format = {
  transform: (doc, ret, options) => {
    return {
      id: ret._id,
      title: ret.title,
      body: ret.body
    }
  }
}

schema.set('toJSON', format)

const Draft = model('Draft', schema)
export default Draft
