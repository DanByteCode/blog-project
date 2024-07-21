import { Link, useLocation } from 'react-router-dom'
import { getFromAPI } from '../utils/fetcher'
import Loader from '../assets/Loader'
import { useUser } from '../hooks/useUser'
import ExitIcon from '../assets/ExitIcon'

export default function Header() {
  const { user, updateStatus } = useUser()
  const path = useLocation()
  async function closeSession() {
    await getFromAPI('acount/logout')
    updateStatus()
  }
  return (
    <header>
      <Link to="/">
        <h1>Blog Editor</h1>
      </Link>
      <nav>
        {user == null ? (
          <ul>
            <Loader />
          </ul>
        ) : !user.login ? (
          <ul>
            <li>
              <Link to="/editor/login" state={path}>
                Log-in
              </Link>
            </li>
            <li>
              <Link to="/editor/sign">Sign-in</Link>
            </li>
            <li></li>
          </ul>
        ) : (
          <ul>
            <li>{user?.name}</li>
            <li>
                  <button title='Close session'
                    onClick={closeSession}><ExitIcon className="exit-btn"/></button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}
