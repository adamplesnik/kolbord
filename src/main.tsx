import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import PlanView from './views/PlanView.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthProvider from './auth/AuthProvider.tsx'
import Login from './auth/Login.tsx'
import Site from './site/Site.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PlanView />,
    errorElement: <PlanView />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  { path: '/site', element: <Site /> },
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
  </React.StrictMode>
)
