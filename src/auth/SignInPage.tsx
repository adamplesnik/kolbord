import { SignedOut, SignIn } from '@clerk/clerk-react'
import LoginWrapper from './LoginWrapper'
import { Suspense } from 'react'

const SignInPage = () => {
  return (
    <LoginWrapper>
      <SignedOut>
        <Suspense fallback={<div>lll</div>}>
          <SignIn />
        </Suspense>
      </SignedOut>
    </LoginWrapper>
  )
}

export default SignInPage
