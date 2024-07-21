import { Schema, model } from 'mongoose'

const schema = new Schema({
  message: { type: Array, required: true },
  date: { type: Date },
  edited: { type: Boolean, default: false },
  author: { type: Schema.ObjectId, ref: 'User' },
  post: { type: Schema.ObjectId }
})

const format = {
  transform: (doc, ret, options) => {
    return {
      id: ret._id,
      message: ret.message,
      edited: ret.edited,
      author: ret.author,
      date: ret.date
    }
  }
}

schema.set('toJSON', format)

const Comment = model('Comment', schema)
export default Comment
