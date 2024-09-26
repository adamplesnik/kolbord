import { ClerkProvider } from '@clerk/clerk-react'
import { HTMLAttributes } from 'react'

const ClerkWrapper = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error('Missing publishable key')
  }

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
          logoLinkUrl: 'https://kolbord.com',
          termsPageUrl: 'https://kolbord.com/terms',
        },
        elements: {
          formFieldInput: '!rounded !text-sm',
          formButtonPrimary: '!rounded !shadow-none after:hidden !text-sm',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}

export default ClerkWrapper
