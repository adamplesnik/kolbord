import { SignedOut, SignUp } from '@clerk/clerk-react'

const SignUpPage = () => {
  return (
    <SignedOut>
      <SignUp />
    </SignedOut>
  )
}

export default SignUpPage
