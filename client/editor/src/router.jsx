import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import App from './App'
import FormLogin from './pages/FormLogin'
import Post from './pages/Post'
import FormSign from './pages/FormSign'
import NewPost from './pages/NewPost'
import EditPost from './pages/EditPost'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/editor/sign',
        element: <FormSign />,
      },
      {
        path: '/editor/login',
        element: <FormLogin />,
      },
      {
        path: '/post/:id',
        element: <Post />,
      },
      {
        path: '/new',
        element: <NewPost />,
      },
      {
        path: '/edit/:id',
        element: <EditPost />,
      },
    ],
  },
])
export default router
