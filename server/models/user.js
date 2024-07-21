import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: { type: String, required: true, unique: true, minLength: 4, maxLength: 24 },
  username: { type: String, required: true, unique: true, minLength: 4, maxLength: 24 },
  password: { type: String, required: true, minLength: 4 },
  comments: [{ type: Schema.ObjectId, ref: 'Comment' }]
})

const format = {
  transform: (doc, ret, options) => {
    return {
      id: ret._id,
      name: ret.name,
      comments: ret.comments
    }
  }
}
schema.set('toJSON', format)

const User = model('User', schema)
export default User
