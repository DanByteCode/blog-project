import { useNavigate, useLocation } from 'react-router-dom'
import { sendFormToAPI } from '../utils/fetcher'
import { useUser } from './useUser'
export default function useSend (redirect) {
  const navigation = useNavigate()
  const status = useLocation()
  const { updateStatus } = useUser()
  const lastDirection = status.state?.pathname ?? '/'
  async function send (event) {
    try {
      const response = await sendFormToAPI(event)
      if (response.success) {
        const newRoute = lastDirection !== '/editor/sign' ? lastDirection : '/'
        navigation(redirect ?? newRoute)
        updateStatus()
      }
      return response
    } catch (err) {
      console.error(err)
    }
  }
  return { send }
}