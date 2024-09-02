import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthProvider from './auth/AuthProvider.tsx'
import LoginPage from './auth/LoginPage.tsx'
import Onboarding from './auth/Onboarding.tsx'
import RegisterCompanyAdminPage from './auth/RegisterCompanyAdminPage.tsx'
import './index.css'
import PlanPage from './pages/PlanPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterCompanyAdminPage />,
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
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
