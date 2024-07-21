import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import App from './App'
import FormLogin from './pages/FormLogin'
import Post from './pages/Post'
import FormSign from './pages/FormSign'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/user/sign',
        element: <FormSign />,
      },
      {
        path: '/user/login',
        element: <FormLogin />,
      },
      {
        path: 'post/:id',
        element: <Post />,
      },
    ],
  },
])
export default router
