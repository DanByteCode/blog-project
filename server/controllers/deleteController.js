import Post from '../models/post.js'
import Comment from '../models/comment.js'
import User from '../models/user.js'
import mongoose from 'mongoose'
import Editor from '../models/editor.js'

async function deletePost (req, res, next) {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const postId = req.params?.id
    if (!postId) res.json({ error: 'No ID given' })
    const post = await Post.findById(postId)
    const editorId = post.author
    await Editor.findByIdAndUpdate(editorId,
      { $pull: { posts: postId } }
    ).session(session)
    await Comment.deleteMany({ post: post.id }).session(session)
    await Post.findByIdAndDelete(postId).session(session)
    await session.commitTransaction()
    res.json({ status: 'Post deleted' })
  } catch (err) {
    await session.abortTransaction()
    next(err)
  } finally {
    session.endSession()
  }
}
async function deleteComment (req, res, next) {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const commentId = req.params?.id
    if (!commentId) res.json({ error: 'No ID given' })
    const comment = await Comment.findById(commentId)
    const postId = comment.post
    const userId = comment.author
    await Post.findByIdAndUpdate(postId,
      { $pull: { comments: commentId } }
    ).session(session)
    await User.findByIdAndUpdate(userId,
      { $pull: { comments: commentId } }
    ).session(session)
    await Comment.findByIdAndDelete(commentId).session(session)
    await session.commitTransaction()
    res.json({ status: 'Comment deleted' })
  } catch (err) {
    await session.abortTransaction()
    next(err)
  } finally {
    session.endSession()
  }
}
const DeleteController = { deleteComment, deletePost }
export default DeleteController
