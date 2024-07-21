import { useState, useEffect } from 'react'
import { getFromAPI } from '../utils/fetcher'

export default function usePost (id) {
  const [post, setPost] = useState([])
  useEffect(() => {
    async function getPost () {
      const route = `post/${id ?? ''}`
      const result = await getFromAPI(route)
      setPost(result)
    }
    getPost()
  }, [id])
  return post
}