import { SignedOut, SignUp } from '@clerk/clerk-react'
import AuthWrapper from '../layouts/AuthLayout'

const SignUpPage = () => {
  return (
    <AuthWrapper signUp>
      <SignedOut>
        <SignUp />
      </SignedOut>
    </AuthWrapper>
  )
}

export default SignUpPage
