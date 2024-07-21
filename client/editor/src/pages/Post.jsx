import { Link, useNavigate, useParams } from 'react-router-dom'
import useAPI from '../hooks/useAPI'
import Loader from '../assets/Loader'
import CommentBox from '../components/CommentBox'
import { deleteToAPI, getFromAPI } from '../utils/fetcher'
import { useUser } from '../hooks/useUser'
import { Editor } from 'draft-js'
import EditIcon from '../assets/EditIcon'
import DeleteIcon from '../assets/DeleteIcon'
import NewTabIcon from '../assets/NewTabIcon'
import { AnimatePresence } from 'framer-motion'
import { convertToEditor } from '../utils/convertEditor'

export default function Post() {
  const { id } = useParams()
  const [post, setPost] = useAPI(`post/${id}`)
  const { user } = useUser()
  const navigate = useNavigate()

  async function reloadComments() {
    const newComments = await getFromAPI(`post/${post.id}/comments`)
    setPost({ ...post, comments: newComments })
  }
  async function deletePost() {
    deleteToAPI(`/post/${id}`)
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        console.error('Error on delete')
      })
  }
  return (
    <>
      {post ? (
        <main>
          <article className="main-post">
            <h2>{post.title}</h2>
            <h4 className="post-editor">{post.author.name}</h4>
            <Editor readOnly={true} editorState={convertToEditor(post.body)} />
            {post.author.id === user.id && (
              <div className="post-options">
                <Link to={`/edit/${post.id}`} state={post} title="Edit Post">
                  <EditIcon className="edit-btn" /> Modify
                </Link>
                <button title="Delete Post" onClick={deletePost}>
                  <DeleteIcon className="delete-btn" /> Delete
                </button>
              </div>
            )}
          </article>
          <footer className="comment section">
            <h3>Comments</h3>
            {post.comments?.length > 0 ? (
              <div className="comment-list">
                <AnimatePresence mode="popLayout">
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
            If you want to make a comment, go to the{' '}
            <a
              target="_blank"
              className="redirect"
              href="https://blog-project-dbc.up.railway.app"
            >
              User
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
