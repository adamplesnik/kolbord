import { ClerkLoading, SignedIn } from '@clerk/clerk-react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import Skeleton from '../atoms/Skeleton'
import Logo from '../basic/Logo'
import Footer from '../partials/Footer'

const skeletonCollection = ['96%', '100%', '92%', '55%', '100%', '93%', '87%', '55%']

const AuthLayout = () => {
  return (
    <div className="mx-auto w-full max-w-5xl pt-12 px-8 md:pt-16 md:px-12">
      <SignedIn>
        <Navigate to="/plan" />
      </SignedIn>
      <Link to={'/'}>
        <Logo className="mb-12 h-6" />
      </Link>
      <div className="flex w-full flex-col md:flex-row md:gap-16">
        <div className="flex min-h-[500px] w-full max-w-sm flex-col gap-8">
          <ClerkLoading>
            <div className="flex h-[500px] w-full flex-col gap-2 p-8">
              {skeletonCollection.map((width, key) => (
                <Skeleton width={width} key={key} />
              ))}
            </div>
          </ClerkLoading>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AuthLayout
