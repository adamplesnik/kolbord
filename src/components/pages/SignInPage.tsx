import { SignedOut, SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <SignedOut>
      <SignIn />
    </SignedOut>
  )
}

export default SignInPage
