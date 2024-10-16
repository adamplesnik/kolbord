import { ClerkLoading, SignedIn } from '@clerk/clerk-react'
import { HTMLAttributes } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Anchor from '../atoms/Anchor'
import Paragraph from '../atoms/Paragraph'
import Skeleton from '../atoms/Skeleton'
import Logo from '../basic/Logo'
import Footer from '../partials/Footer'

const skeletonCollection = ['96%', '100%', '92%', '55%', '100%', '93%', '87%', '55%']

const AuthWrapper = ({ children, signUp = false }: AuthWrapperProps) => {
  return (
    <div className="mx-auto w-full max-w-5xl pt-12 px-8 md:pt-16 md:px-12">
      <SignedIn>
        <Navigate to="/plan" />
      </SignedIn>
      <Link to={'/'}>
        <Logo className="mb-12 h-6" />
      </Link>
      <div className="flex w-full flex-col overflow-hidden md:flex-row md:gap-16">
        <div className="flex min-h-[500px] w-full max-w-sm flex-col gap-8">
          <ClerkLoading>
            <div className="flex h-[500px] w-full flex-col gap-2 p-8">
              {skeletonCollection.map((width, key) => (
                <Skeleton width={width} key={key} />
              ))}
            </div>
          </ClerkLoading>
          {children}
          {!signUp && (
            <Paragraph>
              Don't have an account?{' '}
              <Anchor className="text-cyan-500" to={'/sign-up'}>
                Sign up.
              </Anchor>
            </Paragraph>
          )}
          {signUp && (
            <Paragraph>
              Already have an account?{' '}
              <Anchor className="text-cyan-500" to={'/'}>
                Sign in.
              </Anchor>
            </Paragraph>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

type AuthWrapperProps = {
  signUp?: boolean
} & HTMLAttributes<HTMLDivElement>

export default AuthWrapper
