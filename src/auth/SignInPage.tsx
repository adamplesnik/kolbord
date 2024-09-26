import { SignedOut, SignIn } from '@clerk/clerk-react'
import { Suspense } from 'react'
import AuthWrapper from './AuthWrapper'

const SignInPage = () => {
  return (
    <AuthWrapper>
      <SignedOut>
        <Suspense fallback={<div>lll</div>}>
          <SignIn />
        </Suspense>
      </SignedOut>
    </AuthWrapper>
  )
}

export default SignInPage
