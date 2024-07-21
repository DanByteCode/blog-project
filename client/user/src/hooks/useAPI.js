import { useState, useEffect } from 'react'
import { getFromAPI } from '../utils/fetcher'

export default function useAPI (path) {
  const [consult, setConsult] = useState(null)
  useEffect(() => {
    async function getConsult () {
      const route = path ?? ''
      const result = await getFromAPI(route)
      setConsult(result)
    }
    getConsult()
  }, [path])
  return [consult, setConsult]
}
