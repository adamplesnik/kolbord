import { SignedOut, SignUp } from '@clerk/clerk-react'
import LoginWrapper from './LoginWrapper'

const SignUpPage = () => {
  return (
    <LoginWrapper>
      <SignedOut>
        <SignUp />
      </SignedOut>
    </LoginWrapper>
  )
}

export default SignUpPage
