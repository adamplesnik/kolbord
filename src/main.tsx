import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layouts/Layout.tsx'
import ListPage from './components/pages/ListPage.tsx'
import PlanPage from './components/pages/PlanPage.tsx'
import SignInPage from './components/pages/SignInPage.tsx'
import SignUpPage from './components/pages/SignUpPage.tsx'
import './index.css'
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
  {
    element: <Layout />,
    children: [
      { path: '/plan', element: <PlanPage /> },
      { path: '/list', element: <ListPage /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProviderWrapper>
      <RouterProvider router={router} />
      <div className="hidden md:block">
        <ReactQueryDevtools />
      </div>
      <Analytics />
    </ProviderWrapper>
  </React.StrictMode>
)
