import { RichUtils } from 'draft-js'
import styleButtons from './buttons'

export default function StyleBar({ editorStatus, editorRef }) {
  const [editorState, setEditorState] = editorStatus

  const isActive = (style) => {
    const lineStatus = editorState.getCurrentInlineStyle().toArray()
    return lineStatus.some((s) => s === style)
  }

  const toggleStyle = (e, style) => {
    e.preventDefault()
    editorRef.current?.focus()
    const newState = RichUtils.toggleInlineStyle(editorState, style)
    setEditorState(newState)

    return 'handled'
  }

  return (
    <div className="style-bar">
      {styleButtons.map((s) => {
        return (
          <button
            key={s.key}
            className={isActive(s.key) ? 'active' : 'inactive'}
            onMouseDown={(e) => toggleStyle(e, s.key)}
            style={s.style}
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
