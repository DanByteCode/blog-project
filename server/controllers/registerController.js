import config from '../config/variables.js'
import bcrypt from 'bcrypt'
import Editor from '../models/editor.js'
import User from '../models/user.js'

async function register (model, data) {
  const { name, username, password } = data
  const search = await model.findOne({ $or: [{ name }, { username }] })
  if (!search) {
    if (password.length < 4) {
      return { error: 'The password it\'s too short' }
    }
    try {
      const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS)
      const result = await model.create({
        name,
        username: username.toLowerCase(),
        password: hashedPassword
      })
      return result
    } catch (err) {
      console.error(err)
      return { error: 'Internal error...' }
    }
  } else {
    return { error: 'This user already exists...' }
  }
}

async function registerUser (req, res, next) {
  try {
    const result = await register(User, req.body)
    res.json({
      success: true,
      status: 'User register successfully',
      id: result.id
    })
  } catch (err) { next(err) }
}

async function registerEditor (req, res, next) {
  try {
    const result = await register(Editor, req.body)
    res.json({
      success: true,
      status: 'Editor register successfully',
      id: result.id
    })
  } catch (err) { next(err) }
}

const Register = { registerUser, registerEditor }
export default Register
