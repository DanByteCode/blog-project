import Loader from './assets/Loader'
import PreviewPost from './components/PreviewPost'
import useAPI from './hooks/useAPI'

function App() {
  const [list] = useAPI('post')
  return (
    <>
      <main>
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
