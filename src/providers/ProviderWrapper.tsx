import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import ClerkProviderWrapper from './ClerkProviderWrapper'
import DateContextProvider from './DateContextProvider'
import EditModeContextProvider from './EditModeContextProvider'
import SidebarContextProvider from './SidebarContextProvider'
import ZoneContextProvider from './ZoneContextProvider'

const queryClient = new QueryClient()

const ProviderWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProviderWrapper>
      <QueryClientProvider client={queryClient}>
        <EditModeContextProvider>
          <DateContextProvider>
            <ZoneContextProvider>
              <SidebarContextProvider>{children}</SidebarContextProvider>
            </ZoneContextProvider>
          </DateContextProvider>
        </EditModeContextProvider>
      </QueryClientProvider>
    </ClerkProviderWrapper>
  )
}

export default ProviderWrapper
