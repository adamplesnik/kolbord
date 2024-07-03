import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import PlanView from './views/PlanView.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PlanView />,
    errorElement: <PlanView />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
