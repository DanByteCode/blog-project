import Post from '../models/post.js'
import User from '../models/user.js'
import Editor from '../models/editor.js'
import Comment from '../models/comment.js'

async function getAllPosts (req, res, next) {
  try {
    const consult = await Post.find({}).populate('author')
      .populate({ path: 'comments', populate: { path: 'author', select: ['id', 'name'] } })
    res.json(consult)
  } catch (err) { next(err) }
}

async function getPost (req, res, next) {
  try {
    const idPost = req.params.id
    if (!idPost) res.json({ error: 'Invalid Post' })
    const consult = await Post.findById(idPost).populate('author')
      .populate({ path: 'comments', populate: { path: 'author', select: ['id', 'name'] } })
    res.json(consult)
  } catch (err) { next(err) }
}

async function getComments (req, res, next) {
  try {
    const idPost = req.params.id
    const consult = await Post.findById(idPost)
      .populate({ path: 'comments', populate: { path: 'author', select: ['id', 'name'] } })
    res.json(consult.comments)
  } catch (err) { next(err) }
}

async function getComment (req, res, next) {
  try {
    const consult = await Comment.findById(extractId(req, res))
      .populate({ path: 'post', select: ['id', 'title'] })
      .populate({ path: 'author', select: ['id, name'] })
    res.json(consult)
  } catch (err) { next(err) }
}

async function getUsers (req, res, next) {
  try {
    const consult = await User.find({}).populate({ path: 'comments', select: ['id', 'message'] })
    res.json(consult)
  } catch (err) { next(err) }
}

async function getUser (req, res, next) {
  try {
    const consult = await User.findById(extractId(req, res)).populate({ path: 'comments', select: ['id', 'message', 'edited', 'date'] })
    res.json(consult)
  } catch (err) { next(err) }
}

async function getEditors (req, res, next) {
  try {
    const consult = await Editor.find({})
      .populate({ path: 'posts', select: ['id', 'title'] })
    res.json(consult)
  } catch (err) { next(err) }
}

async function getEditor (req, res, next) {
  try {
    const consult = await Editor.findById(extractId(req, res))
      .populate({ path: 'posts', select: ['id', 'title', 'date'] })
    res.json(consult)
  } catch (err) { next(err) }
}

function extractId (req, res) {
  const idPost = req.params.id
  if (idPost) {
    return idPost
  } else {
    res.json({ error: 'Invalid Post' })
  }
}

const GetController = {
  getAllPosts,
  getPost,
  getComments,
  getComment,
  getUsers,
  getUser,
  getEditors,
  getEditor
}
export default GetController
