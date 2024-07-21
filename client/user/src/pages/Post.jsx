import { useParams } from 'react-router-dom'
import useAPI from '../hooks/useAPI'
import Loader from '../assets/Loader'
import CommentPanel from '../components/CommentPanel'
import CommentBox from '../components/CommentBox'
import { getFromAPI } from '../utils/fetcher'
import { useUser } from '../hooks/useUser'
import { Editor } from 'draft-js'
import { AnimatePresence } from 'framer-motion'
import { convertToEditor } from '../utils/convertEditor'
import NewTabIcon from '../assets/NewTabIcon'

export default function Post() {
  const { id } = useParams()
  const [post, setPost] = useAPI(`post/${id}`)
  const { user } = useUser()
  async function reloadComments() {
    const newComments = await getFromAPI(`post/${post.id}/comments`)
    setPost({ ...post, comments: newComments })
  }

  return (
    <>
      {post ? (
        <main>
          <article className="main-post">
            <h2>{post.title}</h2>
            <h4 className="post-editor">{post.author.name}</h4>
            <Editor readOnly={true} editorState={convertToEditor(post.body)} />
          </article>
          <footer className="comment section">
            <h3>Comments</h3>
            <CommentPanel reference={id} reloadComments={reloadComments} />
            {post.comments?.length > 0 ? (
              <div className="comment-list">
                <AnimatePresence mode="sync">
                  {post.comments.map((c) => {
                    return (
                      <CommentBox
                        key={c.id}
                        comment={c}
                        modificable={c.author.id === user.id}
                        reloadComments={reloadComments}
                      />
                    )
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <span>No Comments</span>
            )}
          </footer>
          <div className="tip section">
            If you want to make a post, go to the{' '}
            <a
              className="redirect"
              href="https://blog-project-editor.netlify.app"
            >
              Editor
              <NewTabIcon />
            </a>{' '}
            page.
          </div>
        </main>
      ) : (
        <Loader className="centralized" />
      )}
    </>
  )
}
