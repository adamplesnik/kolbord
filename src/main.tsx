import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthProvider from './auth/AuthProvider.tsx'
import Login from './auth/Login.tsx'
import './index.css'
import Site from './site/Site.tsx'
import PlanView from './views/PlanView.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Site />,
    errorElement: <Site />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  { path: '/plan', element: <PlanView /> },
])
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
    <Analytics />
  </React.StrictMode>
)
