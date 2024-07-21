export function userAuthorization (req, res, next) {
  if (req.session?.authorization === 'user') {
    next()
  } else {
    res.status(401).json({ error: 'Operation no authorized...' })
  }
}
export function editorAuthorization (req, res, next) {
  if (req.session?.authorization === 'editor') {
    next()
  } else {
    res.status(401).json({ error: 'Operation no authorized...' })
  }
}
