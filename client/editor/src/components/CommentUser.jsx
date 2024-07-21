import { useState } from 'react'
import 'draft-js/dist/Draft.css'
import { postToAPI } from '../utils/fetcher'
import EditorBox from './TextEditor/EditorBox'

export default function CommentUser({ reference, reloadComments }) {
  const [sent, setSent] = useState(false)

  async function sendMessage(message) {
    postToAPI(`post/${reference}/comment`, {
      message: message.blocks,
    }).then((res) => {
      setSent(res)
      reloadComments()
    })
  }

  function resetTextBox() {
    setSent(false)
  }
  return (
    <div className="user-comment">
      {!sent ? (
        <>
          <span>Share your comment</span>
          <EditorBox editable={sent} sendFunction={sendMessage} />
        </>
      ) : (
        <button onClick={resetTextBox}>Sent Other</button>
      )}
    </div>
  )
}
