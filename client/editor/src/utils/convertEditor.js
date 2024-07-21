import { convertFromRaw, EditorState } from 'draft-js';

export function convertToEditor (input) {
  return EditorState.createWithContent(
    convertFromRaw({ blocks: input, entityMap: {} })
  )
}