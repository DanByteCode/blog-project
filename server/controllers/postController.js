import Post from '../models/post.js'
import User from '../models/user.js'
import Editor from '../models/editor.js'
import Comment from '../models/comment.js'
import mongoose from 'mongoose'

async function newPost (req, res, next) {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const idEditor = req.session.user.id
    const result = await Post.create({
      ...req.body,
      author: req.session.user.id,
      date: Date.now()
    })
    await Editor.findByIdAndUpdate(idEditor,
      { $push: { posts: result } }
    ).session(session)
    await session.commitTransaction()
    res.json(result)
  } catch (err) {
    await session.abortTransaction()
    next(err)
  } finally {
    session.endSession()
  }
}

async function newComment (req, res, next) {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    if (!req.params.id) res.json({ error: 'Invalid Post' })
    const result = await Comment.create({
      ...req.body,
      author: req.session.user.id,
      date: Date.now()
    })
    await Post.findByIdAndUpdate(req.params.id,
      { $push: { comments: result } }
    ).session(session)
    await User.findByIdAndUpdate(req.session.user.id,
      { $push: { comments: result } }
    ).session(session)
    await session.commitTransaction()
    res.json(result)
  } catch (err) {
    await session.abortTransaction()
    next(err)
  } finally {
    session.endSession()
  }
}

const PostController = { newPost, newComment }
export default PostController
