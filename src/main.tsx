import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import PlanView from './views/PlanView.tsx'
import ApiTest from './data/ApiTest.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PlanView />,
    errorElement: <PlanView />,
  },
  {
    path: '/api-test',
    element: <ApiTest />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
