import { ClerkProvider } from '@clerk/clerk-react'
import { HTMLAttributes } from 'react'

const ClerkProviderWrapper = ({ children }: HTMLAttributes<HTMLDivElement>) => {
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
          socialButtonsVariant: 'blockButton',
          logoPlacement: 'none',
        },
        variables: {
          fontSize: 'var(--font-size-sm)',
        },
        elements: {
          badge: 'text-xs',
          formFieldHintText: 'text-sm opacity-50',
          formButtonPrimary:
            '!shadow-none after:hidden ![--accent:var(--color-zinc-800)] ![--accentHover:var(--color-zinc-700)] min-h-10',
          formFieldInput: '!rounded-md !shadow-none !border-1',
          headerTitle: '!text-xl text-left !font-semibold',
          headerSubtitle: '!hidden',
          footer: 'text-xs',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}

export default ClerkProviderWrapper
