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
          unsafe_disableDevelopmentModeWarnings: true,
          logoPlacement: 'none',
        },
        variables: {
          fontSize: 'var(--font-size-sm)',
        },
        elements: {
          avatarBox: '!rounded-md !size-8',
          card: '!p-px !shadow-none !border-none !rounded-none !bg-transparent !text-current',
          cardBox: '!shadow-none !w-full',
          footer: '!pt-0 *:!border-none !rounded-full !w-fit',
          footerAction: '!hidden',
          formButtonPrimary:
            '!rounded !shadow-none after:hidden !text-base ![--accent:var(--color-zinc-800)] ![--accentHover:var(--color-zinc-700)] min-h-10',
          formFieldInput: '!rounded !text-base !shadow-none !border-1',
          formFieldLabel: '!text-xs',
          headerTitle: '!text-xl text-left !font-semibold',
          headerSubtitle: '!hidden',
          identityPreview: '!justify-start !pt-1',
          organizationListPreviewButton: '!text-red-400',
          organizationPreviewSecondaryIdentifier: 'pt-1 !text-zinc-500',
          scrollBox: '!rounded-none',
          userButtonBox: '!rounded-md !size-8',
          userButtonTrigger: 'focus:!shadow-none',
          userPreviewSecondaryIdentifier: 'pt-1 !text-zinc-500',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}

export default ClerkProviderWrapper
