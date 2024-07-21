import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js'
import StyleBar from './StyleBar'
import { useEffect, useRef, useState } from 'react'

export default function EditorBox ({
  textButton = 'Send',
  editable = false,
  sendFunction,
  editorStatus,
  children,
}) {
  const [editorState, setEditorState] = useState(
    editorStatus ?? EditorState.createEmpty()
  )
  const editor = useRef(null)

  useEffect(() => {
    editor.current.focus()
  }, [])

  function handleReturn(e) {
    if (!e.shiftKey || e.type === 'click') {
      setTimeout(() => {
        const message = convertToRaw(editorState.getCurrentContent())
        sendFunction(message)
      }, 0)
      return 'handled'
    }
    return 'not-handled'
  }

  function handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  return (
    <div ref={editor} className="editor-box editable">
      <StyleBar
        editorStatus={[editorState, setEditorState]}
        editorRef={editor}
      />
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder={'Comment...'}
        readOnly={editable}
        handleReturn={handleReturn}
        handleKeyCommand={handleKeyCommand}
      />
      <button onClick={handleReturn}>{textButton}</button>
      {children}
    </div>
  )
}
