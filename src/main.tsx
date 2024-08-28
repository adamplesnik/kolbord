import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthProvider from './auth/AuthProvider.tsx'
import './index.css'
import LoginPage from './pages/LoginPage.tsx'
import PlanPage from './pages/PlanPage.tsx'
import Site from './site/Site.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Site />,
    errorElement: <Site />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  { path: '/plan', element: <PlanPage /> },
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
