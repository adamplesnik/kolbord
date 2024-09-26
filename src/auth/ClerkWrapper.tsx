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
          socialButtonsVariant: 'blockButton',
          unsafe_disableDevelopmentModeWarnings: true,
          logoPlacement: 'none',
        },

        elements: {
          card: '!p-px my-8 !shadow-none !border-none !rounded-none',
          cardBox: '!shadow-none !w-full !border !border-transparent',
          footer: '!pt-0 *:!border-none !rounded-full !w-fit',
          footerAction: '!hidden',
          formButtonPrimary:
            '!rounded !shadow-none after:hidden !text-base ![--accent:var(--color-zinc-800)] ![--accentHover:var(--color-zinc-700)] min-h-10',
          formFieldInput: '!rounded !text-base !shadow-none !border-1',
          formFieldLabel: '!text-xs',
          headerTitle: '!text-xl text-left',
          headerSubtitle: '!hidden',
          identityPreview: '!justify-start !pt-1',
          organizationPreviewMainIdentifier: '!text-sm',
          organizationPreviewSecondaryIdentifier: 'pt-1 !text-slate-500',
          rootBox: '!w-full',
          userPreviewMainIdentifier: '*:!text-sm',
          userPreviewSecondaryIdentifier: 'pt-1 !text-slate-500',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}

export default ClerkWrapper
