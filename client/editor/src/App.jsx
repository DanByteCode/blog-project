import { Link } from 'react-router-dom'
import Loader from './assets/Loader'
import PreviewPost from './components/PreviewPost'
import useAPI from './hooks/useAPI'
import { useUser } from './hooks/useUser'

function App() {
  const [list] = useAPI('post')
  const { editorPermissions } = useUser()
  return (
    <>
      <main>
        <div className="control-bar">
          <Link to={editorPermissions? '/new' : '/editor/login'}>New Post</Link>
        </div>
        {list?.length > 0 ? (
          list.map((l) => {
            return <PreviewPost key={l.id} content={l} />
          })
        ) : list == null ? (
          <Loader className="centralized" />
        ) : (
          <h3>No post found :c</h3>
        )}
      </main>
    </>
  )
}

export default App
