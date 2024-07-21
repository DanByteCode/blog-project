import { convertFromRaw, Editor, EditorState } from 'draft-js'
import { useState } from 'react'
import EditorBox from './TextEditor/EditorBox'
import { deleteToAPI, patchToAPI } from '../utils/fetcher'
import UserIcon from '../assets/UserIcon'
import DeleteIcon from '../assets/DeleteIcon'
import EditIcon from '../assets/EditIcon'
import { convertToEditor } from '../utils/convertEditor'
import { motion } from 'framer-motion'

const convert = (message) =>
  EditorState.createWithContent(
    convertFromRaw({ blocks: message, entityMap: {} })
  )

export default function CommentBox({ comment, modificable, reloadComments }) {
  const [editMode, setEditMode] = useState(false)
  const [text, setText] = useState(convertToEditor(comment.message))
  async function uploadMessage(message) {
    patchToAPI(`comment/${comment.id}`, {
      message: message.blocks,
    }).then((res) => {
      setEditMode(false)
      setText(convert(res.message))
      reloadComments()
    })
  }
  async function deleteComment() {
    deleteToAPI(`comment/${comment.id}`).then((res) => {
      reloadComments()
    })
  }
  return (
    <motion.div layout layoutId={comment.id} className="message">
      <h4>
        <UserIcon />
        {comment.author.name}
      </h4>
      {!editMode ? (
        <>
          <Editor className="editor-box" editorState={text} readOnly={true} />
          {modificable && (
            <div className='options'>
              <button title="Edit Comment"
                onClick={() => setEditMode(true)}>
                <EditIcon className="edit-btn"/>
              </button>
              <button title="Delete Comment" onClick={deleteComment}>
                <DeleteIcon className="delete-btn"/>
              </button>
            </div>
          )}
        </>
      ) : (
          <EditorBox
            textButton='Edit'
          editable={!editMode}
          editorStatus={text}
          sendFunction={uploadMessage}
        >
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </EditorBox>
      )}
    </motion.div>
  )
}
