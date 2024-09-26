import { SignedOut, SignUp } from '@clerk/clerk-react'
import AuthWrapper from './AuthWrapper'

const SignUpPage = () => {
  return (
    <AuthWrapper>
      <SignedOut>
        <SignUp />
      </SignedOut>
    </AuthWrapper>
  )
}

export default SignUpPage
