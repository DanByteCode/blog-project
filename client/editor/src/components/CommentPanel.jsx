import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import CommentUser from './CommentUser'

export default function CommentPanel({ reference, reloadComments }) {
  const { isLogged } = useUser()
  const path = useLocation()
  return isLogged ? (
    <CommentUser reference={reference} reloadComments={reloadComments} />
  ) : (
    <span className="user-comment">
      You need to{' '}
      <Link to={'/user/login'} state={path}>
      Log-in
      </Link>{' '}
      to comment
    </span>
  )
}
