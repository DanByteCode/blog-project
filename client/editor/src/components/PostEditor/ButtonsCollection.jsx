import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from '@draft-js-plugins/buttons'
import ChangeSizeButton from './ChangeSizeButton'

export default function ButtonsCollection({ externalProps, children }) {
  return (
    <>
      {children}
      <div className="style-control">
        <BoldButton {...externalProps} />
        <ItalicButton {...externalProps} />
        <UnderlineButton {...externalProps} />
        <ChangeSizeButton {...externalProps} />
        <UnorderedListButton {...externalProps} />
        <OrderedListButton {...externalProps} />
        <BlockquoteButton {...externalProps} />
        <CodeBlockButton {...externalProps} />
      </div>
    </>
  )
}

