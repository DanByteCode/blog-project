import { useContext } from 'react'
import userContext from '../utils/userContext'

export function useUser () {
  const context = useContext(userContext)
  return context
}
