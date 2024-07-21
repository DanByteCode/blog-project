import { Form, Link, Navigate } from 'react-router-dom'
import useSend from '../hooks/useSend'
import { useUser } from '../hooks/useUser'

export default function FormLogin() {
  const postal = useSend()
  const { isLogged } = useUser()
  return !isLogged ? (
    <main className="form-container">
      <h2>EDITOR LOGIN</h2>
      <Form onSubmit={postal.send} action="/api/editor/login">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </Form>
      <h4>
        Do you need an editor account? <Link to={'/editor/sign'}>Sign-in</Link>
      </h4>
    </main>
  ) : (
    <Navigate to={'/'} />
  )
}
