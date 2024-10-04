import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import ClerkProviderWrapper from '../auth/ClerkProviderWrapper'
import DateContextProvider from './DateContextProvider'
import EditModeContextProvider from './EditModeContextProvider'
import SidebarContextProvider from './SidebarContextProvider'

const queryClient = new QueryClient()

const ProviderWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProviderWrapper>
      <QueryClientProvider client={queryClient}>
        <EditModeContextProvider>
          <DateContextProvider>
            <SidebarContextProvider>{children}</SidebarContextProvider>
          </DateContextProvider>
        </EditModeContextProvider>
      </QueryClientProvider>
    </ClerkProviderWrapper>
  )
}

export default ProviderWrapper
