import { useNavigate } from 'react-router-dom'
import RichEditor from '../components/PostEditor/RichEditor'
import { postToAPI } from '../utils/fetcher'
import { useRef } from 'react'

export default function NewPost() {
  const title = useRef(null)
  const navigate = useNavigate()
  async function publishPost(message) {
    postToAPI(`post`, {
      title: title.current.value,
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
      <article>
        <h2>NEW POST</h2>
        <label className="title-label">
          TITLE:
          <input ref={title} name="title" placeholder="Title of the Post..." />
        </label>
        <RichEditor sendFunction={publishPost} />
      </article>
    </main>
  )
}
