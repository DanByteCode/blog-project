import { Link } from 'react-router-dom'
export default function PreviewPost ({ content }) {
  return (
    <article>
      <Link to={`/post/${content.id}`}>
        <h3>{content.title}</h3>
      </Link>
      <span className='author'>Author: {content.author.name}</span>
      <span className='info'>{content.date}</span>
    </article>
  )
}
