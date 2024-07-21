import Post from '../models/post.js'
import Comment from '../models/comment.js'

async function editPost (req, res, next) {
  try {
    const postId = req.params?.id
    const editTitle = req.body?.title
    const editBody = req.body?.body
    if (!postId) res.json({ error: 'No ID given' })
    const result = await Post.findByIdAndUpdate(postId, {
      title: editTitle,
      body: editBody
    })
    res.json(result)
  } catch (err) { next(err) }
}

async function editComment (req, res, next) {
  try {
    const idComment = req.params?.id
    if (!idComment) res.json({ error: 'No ID given' })
    const result = await Comment.findByIdAndUpdate(idComment,
      {
        message: req.body.message,
        edited: true
      }, { new: true })
    res.json(result)
  } catch (err) {
    next(err)
  }
}
const PatchController = { editPost, editComment }
export default PatchController
