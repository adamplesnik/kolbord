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
          logoPlacement: 'none',
        },
        elements: {
          card: '!p-0.25 !shadow-none !border-none !rounded-none',
          cardBox: '!shadow-none !w-full !border !border-slate-400',
          footerAction: '!hidden',
          formFieldInput: '!rounded !text-sm',
          formButtonPrimary: '!rounded !shadow-none after:hidden !text-sm',
          rootBox: '!w-full',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}

export default ClerkWrapper
