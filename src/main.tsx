import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthProvider from './auth/AuthProvider.tsx'
import './index.css'
import PlanPage from './pages/PlanPage.tsx'
import LoginPage from './site/LoginPage.tsx'
import RegisterCompanyAdminPage from './site/RegisterCompanyAdminPage.tsx'
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
  {
    path: '/register',
    element: <RegisterCompanyAdminPage />,
  },
  { path: '/plan', element: <PlanPage /> },
])
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
    <Analytics />
  </React.StrictMode>
)
