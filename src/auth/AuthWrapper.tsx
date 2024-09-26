import { SignedIn } from '@clerk/clerk-react'

import { HTMLAttributes } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Anchor from '../components/basic/Anchor'
import Logo from '../components/basic/Logo'
import Paragraph from '../components/basic/Paragraph'
import AuthFooter from './AuthFooter'

const AuthWrapper = ({ children, signUp = false }: AuthWrapperProps) => {
  return (
    <div className="mx-auto w-full max-w-5xl pt-12 px-8 md:pt-16 md:px-12">
      <SignedIn>
        <Navigate to="/plan" />
      </SignedIn>
      <Link to={'/'} className="block pb-12">
        <Logo className="h-6" />
      </Link>
      <div className="flex w-full flex-col overflow-hidden md:flex-row md:gap-16">
        <div className="order-last flex-1 rounded-xl bg-cover bg-center bg-no-repeat md:block md:pt-8">
          <Paragraph className="pb-12">
            <strong>The smoothest space booking.</strong> Opinionated, free to use, and open source
            app for one-click reservation of anything.{' '}
            <Anchor className="block pt-4 text-cyan-500" to={'https://kolbord.com'}>
              Learn more &rarr;
            </Anchor>
          </Paragraph>
          {!signUp && (
            <Paragraph>
              Don't have an account?{' '}
              <Anchor className="text-cyan-500" to={'/sign-up'}>
                Sign up
              </Anchor>
            </Paragraph>
          )}
          {signUp && (
            <Paragraph>
              Already have an account?{' '}
              <Anchor className="text-cyan-500" to={'/'}>
                Sign in
              </Anchor>
            </Paragraph>
          )}
        </div>
        <div className="w-full flex-1">{children}</div>
      </div>
      <AuthFooter />
    </div>
  )
}

type AuthWrapperProps = {
  signUp?: boolean
} & HTMLAttributes<HTMLDivElement>

export default AuthWrapper
