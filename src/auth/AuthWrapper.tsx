import { SignedIn } from '@clerk/clerk-react'
import { HTMLAttributes } from 'react'
import { Navigate } from 'react-router-dom'
import AuthFooter from './AuthFooter'

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return (
    <div className="w-full md:min-h-screen">
      <div className="mx-auto flex w-full max-w-5xl overflow-hidden md:gap-16">
        <div className="mx-auto flex w-full flex-col gap-8 p-8 md:m-0">
          {children}
          <SignedIn>
            <Navigate to="/plan" />
          </SignedIn>
        </div>
        <div className="sticky top-4 z-10 hidden max-h-[calc(100vh_-_2rem)] flex-1 rounded-xl bg-cover bg-center bg-no-repeat md:block"></div>
      </div>
      <AuthFooter />
    </div>
  )
}

type AuthWrapperProps = {
  showFooter?: boolean
} & HTMLAttributes<HTMLDivElement>

export default AuthWrapper
