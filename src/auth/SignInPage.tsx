import { ClerkLoading, SignedOut, SignIn } from '@clerk/clerk-react'
import AuthWrapper from './AuthWrapper'

const SignInPage = () => {
  return (
    <AuthWrapper>
      <SignedOut>
        <ClerkLoading>loooo</ClerkLoading>
        <SignIn />
      </SignedOut>
    </AuthWrapper>
  )
}

export default SignInPage
