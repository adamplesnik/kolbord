import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/SignInPage.tsx'
import SignUpPage from './auth/SignUpPage.tsx'
import './index.css'
import BookingsPage from './pages/BookingsPage.tsx'
import ListPage from './pages/ListPage.tsx'
import PlanPage from './pages/PlanPage.tsx'
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
  { path: '/bookings', element: <BookingsPage /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProviderWrapper>
      <RouterProvider router={router} />
      <Analytics />
    </ProviderWrapper>
  </React.StrictMode>
)
