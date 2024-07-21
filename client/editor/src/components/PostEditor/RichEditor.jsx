import { useState, useRef } from 'react'
import Editor from '@draft-js-plugins/editor'
import createToolbarPlugin from '@draft-js-plugins/static-toolbar'
import { convertToRaw, EditorState, RichUtils } from 'draft-js'
import ButtonsCollection from './ButtonsCollection'
import { convertToEditor } from '../../utils/convertEditor'

const toolbarPlugin = createToolbarPlugin()
const { Toolbar } = toolbarPlugin
const plugins = [toolbarPlugin]
export default function RichEditor({ sendFunction, setInitial }) {
  const [editorState, setEditorState] = useState(
    setInitial ? convertToEditor(setInitial) : EditorState.createEmpty()
  )
  const editor = useRef(null)

  const focus = () => {
    editor.current.focus()
  }

  const onChange = (editorState) => {
    setEditorState(editorState)
  }
  function handleReturn() {
    setTimeout(() => {
      const message = convertToRaw(editorState.getCurrentContent())
      sendFunction(message)
    }, 0)
    return 'handled'
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
    <div className="Rich-editor">
      <div className="editor-section" onClick={focus}>
        <Toolbar>
          {(externalProps) => (
            <ButtonsCollection
              externalProps={externalProps}
              getEditorState={editorState}
              setEditorState={setEditorState}
            ></ButtonsCollection>
          )}
        </Toolbar>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          plugins={plugins}
          ref={editor}
          placeholder="Content..."
        />
      </div>
      <button className="publish-btn" onClick={handleReturn}>
        Publish
      </button>
    </div>
  )
}
