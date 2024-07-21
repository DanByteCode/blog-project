import { useLocation, useNavigate, useParams } from 'react-router-dom'
import RichEditor from '../components/PostEditor/RichEditor'
import { getFromAPI, patchToAPI } from '../utils/fetcher'
import { useEffect,  useState } from 'react'
import Loader from '../assets/Loader'

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const status = useLocation()
  const [postStatus, setPostStatus] = useState(status.state)
  const [currentTitle, setTitle] = useState(postStatus.title)
  useEffect(() => {
    if (!postStatus) {
      getPost()
    }
    async function getPost () {
      const currentPost = await getFromAPI(`post/${id}`)
      setPostStatus(currentPost)
      setTitle(currentPost.title)
    }
  }, [id, postStatus])
  async function publishPost(message) {
    patchToAPI(`post/${id}`, {
      title: currentTitle,
      body: message.blocks,
    })
      .then((res) => {
        navigate(`/post/${res.id}`)
      })
      .catch((err) => {
        console.error(err.error)
      })
  }
  return (
    <main>
      {postStatus ? (
        <article>
          <h2>NEW POST</h2>
          <label className="title-label">
            TITLE:
            <input
              name="title"
              placeholder="Title of the Post..."
              value={currentTitle}
              onChange={(e)=>setTitle(e.target.value)}
            />
          </label>
          <RichEditor sendFunction={publishPost} setInitial={postStatus.body} />
        </article>
      ) : (
        <Loader className="centralized" />
      )}
    </main>
  )
}
