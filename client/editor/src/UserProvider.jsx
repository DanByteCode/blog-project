import useAPI from './hooks/useAPI'
import { getFromAPI } from './utils/fetcher'
import userContext from './utils/userContext'

export function UserProvider({ children }) {
  const [user, setUser] = useAPI('acount/status')
  async function updateStatus() {
    setUser(await getFromAPI('acount/status'))
  }
  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        updateStatus,
        isLogged: user?.login,
        editorPermissions: user?.permissions === 'editor',
      }}
    >
      {children}
    </userContext.Provider>
  )
}
