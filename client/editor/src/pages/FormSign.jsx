import { Form, Link, Navigate } from 'react-router-dom'
import useSend from '../hooks/useSend'
import { useUser } from '../hooks/useUser'

export default function FormSign() {
  const postal = useSend('/editor/login')
  const { isLogged } = useUser()
  return !isLogged ? (
    <main className="form-container">
      <h2>EDITOR SIGN-IN</h2>
      <Form onSubmit={postal.send} action="/api/editor">
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Submit</button>
      </Form>
      <h4>
        Already have an editor account?? <Link to={'/editor/sign'}>Log-in</Link>
      </h4>
    </main>
  ) : (
    <Navigate to={'/'} />
  )
}
