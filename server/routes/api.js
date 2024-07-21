import { userAuthorization, editorAuthorization } from '../middlewares/auth.js'
import { Router } from 'express'
import GetController from '../controllers/getController.js'
import PostController from '../controllers/postController.js'
import AuthController from '../controllers/authController.js'
import Register from '../controllers/registerController.js'
import PatchController from '../controllers/patchController.js'
import DeleteController from '../controllers/deleteController.js'
export const api = Router()

// SESSION STATUS
api.get('/acount/status', AuthController.status)
api.get('/acount/logout', AuthController.logout)
api.post('/user/login', AuthController.loginUser)
api.post('/editor/login', AuthController.loginEditor)

// GET
api.get('/', GetController.getAllPosts)
api.get('/post/:id/comments', GetController.getComments)
api.get('/post/:id', GetController.getPost)
api.get('/post', GetController.getAllPosts)
api.get('/comment/:id', GetController.getComment)
api.get('/user', GetController.getUsers)
api.get('/user/:id', GetController.getUser)
api.get('/editor', GetController.getEditors)
api.get('/editor/:id', GetController.getEditor)

// POST
api.post('/post', editorAuthorization, PostController.newPost)
api.post('/post/:id/comment', PostController.newComment)
api.post('/user', Register.registerUser)
api.post('/editor', Register.registerEditor)

// PATCH
api.patch('/post/:id', editorAuthorization, PatchController.editPost)
api.patch('/comment/:id', userAuthorization, PatchController.editComment)

// DELETE
api.delete('/post/:id', editorAuthorization, DeleteController.deletePost)
api.delete('/comment/:id', userAuthorization, DeleteController.deleteComment)

// FALLBACK
api.get('*', (req, res) => res.status(404).json({ error: 'Not found' }))
