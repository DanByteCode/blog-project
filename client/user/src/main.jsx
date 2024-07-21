import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { UserProvider } from './UserProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
   <UserProvider>
       <RouterProvider router={router} />
   </UserProvider>
)
