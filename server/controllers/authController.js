import config from '../config/variables.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Editor from '../models/editor.js'
import User from '../models/user.js'

async function login (credentials, model, result) {
  const { username, password } = credentials
  const userLog = await model.findOne({ username: username?.toLowerCase() })
  if (userLog) {
    const success = await bcrypt.compare(password, userLog.password)
    if (success) {
      const data = {
        type: model.modelName,
        id: userLog.id
      }
      const token = jwt.sign(data, config.SECRET, { expiresIn: '7d' })
      result.cookie('API_USER_TOKEN', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })
      result.status(202).json({
        success: true,
        status: 'Logged successfully'
      })
    } else {
      result.status(400).json({ error: 'Incorrect password' })
    }
  } else {
    result.status(400).json({ error: 'This User not exist' })
  }
}
async function loginUser (req, res, next) {
  if (req.session?.user) {
    res.status(400).json({ error: 'This user already logged' })
  } else {
    try {
      await login(req.body, User, res)
    } catch (err) {
      next(err)
    }
  }
}
async function loginEditor (req, res, next) {
  if (req.session?.user) {
    res.status(400).json({ error: 'This user already logged' })
  } else {
    await login(req.body, Editor, res)
  }
}
function logout (req, res, next) {
  res.clearCookie('API_USER_TOKEN').json({ status: 'Session closed' })
}
function status (req, res, next) {
  const info = req.session?.user ?? null
  let response = { login: false }
  if (info) {
    response = {
      login: true,
      id: info.id,
      name: info.name,
      permissions: req.session.authorization
    }
  }
  res.json(response)
}
const AuthController = { loginUser, loginEditor, logout, status }
export default AuthController
