import { SignedOut, SignIn } from '@clerk/clerk-react'
import { Suspense } from 'react'
import AuthWrapper from './AuthWrapper'

const SignInPage = () => {
  return (
    <AuthWrapper>
      <SignedOut>
        <Suspense fallback={<div>lll</div>}>
          <SignIn
            appearance={{
              layout: {
                logoLinkUrl: 'https://kolbord.com',
                termsPageUrl: 'https://kolbord.com/terms',
              },
              elements: {
                formFieldInput: '!rounded !text-sm',
                formButtonPrimary: '!rounded !shadow-none after:hidden !text-sm',
              },
            }}
          />
        </Suspense>
      </SignedOut>
    </AuthWrapper>
  )
}

export default SignInPage
