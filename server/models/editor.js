import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: { type: String, required: true, unique: true, minLength: 4, maxLength: 24 },
  username: { type: String, required: true, unique: true, minLength: 4, maxLength: 24 },
  password: { type: String, required: true, minLength: 4 },
  posts: [{ type: Schema.ObjectId, ref: 'Post' }]
})

const format = {
  transform: (doc, ret, options) => {
    return {
      id: ret._id,
      name: ret.name,
      posts: ret.posts
    }
  }
}

schema.set('toJSON', format)

const Editor = model('Editor', schema)
export default Editor
