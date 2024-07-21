import { RichUtils } from 'draft-js'

export default function ChangeSizeButton({ getEditorState, setEditorState }) {
  const handleClick = () => {
    const newState = RichUtils.toggleBlockType(getEditorState(), 'header-three')
    setEditorState(newState)
  }

  return (
    <div>
      <button onMouseDown={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={22}
          height={22}
          fill="#e8eaed"
          viewBox="0 -960 960 960"
        >
          <path d="M560.57-140.78v-540.35h-201.7v-138.09h540.35v138.09H698.09v540.35H560.57Zm-379.22 0v-322.26H60.78v-137.53h378.65v137.53H318.87v322.26H181.35Z" />
        </svg>
      </button>
    </div>
  )
}
