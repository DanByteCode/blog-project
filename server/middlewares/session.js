import jwt from 'jsonwebtoken'
import config from '../config/variables.js'
import User from '../models/user.js'
import Editor from '../models/editor.js'
export default async function session (req, res, next) {
  try {
    if (req.cookies?.API_USER_TOKEN) {
      let sessionUser = null
      const token = req.cookies.API_USER_TOKEN
      const verify = jwt.verify(token, config.SECRET)
      if (verify?.type === 'Editor') {
        sessionUser = await Editor.findById(verify.id)
      } else {
        sessionUser = await User.findById(verify.id)
      }
      req.session = { user: sessionUser, authorization: verify.type.toLowerCase() ?? null }
    }
  } catch (err) {
    console.log(err)
  } finally {
    next()
  }
}
