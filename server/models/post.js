import { Schema, model } from 'mongoose'
import dateFormat from 'dateformat'

const schema = new Schema({
  title: { type: String, required: true, minLength: 4, maxLength: 128 },
  body: { type: Array, required: true, minLength: 4, maxLength: 2048 },
  date: { type: Date },
  author: { type: Schema.ObjectId, ref: 'Editor' },
  comments: [{ type: Schema.ObjectId, ref: 'Comment' }]
})

const format = {
  transform: (doc, ret, options) => {
    return {
      id: ret._id,
      title: ret.title,
      body: ret.body,
      author: ret.author,
      date: dateFormat(ret.date, 'd mmm yyyy'),
      comments: ret.comments
    }
  }
}

schema.set('toJSON', format)

const Post = model('Post', schema)
export default Post
