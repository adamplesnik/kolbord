import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ClerkWrapper from './auth/ClerkWrapper.tsx'
import SignInPage from './auth/SignInPage.tsx'
import SignUpPage from './auth/SignUpPage.tsx'
import './index.css'
import MainPage from './pages/MainPage.tsx'

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

  { path: '/plan', element: <MainPage /> },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkWrapper>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Analytics />
    </ClerkWrapper>
  </React.StrictMode>
)
