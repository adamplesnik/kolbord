import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ListPage from './pages/ListPage.tsx'
import PlanPage from './pages/PlanPage.tsx'
import SignInPage from './pages/SignInPage.tsx'
import SignUpPage from './pages/SignUpPage.tsx'
import ProviderWrapper from './providers/ProviderWrapper.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
    errorElement: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },

  { path: '/plan', element: <PlanPage /> },
  { path: '/list', element: <ListPage /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProviderWrapper>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
      <Analytics />
    </ProviderWrapper>
  </React.StrictMode>
)
