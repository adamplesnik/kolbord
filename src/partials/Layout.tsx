import { RedirectToSignIn, SignedOut } from '@clerk/clerk-react'
import { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import Heading from '../components/basic/Heading'
import Logo from '../components/basic/Logo'
import UserMenu from '../components/user/UserMenu'
import DateContextProvider from '../context/DateContextProvider'
import EditModeContextProvider from '../context/EditModeContextProvider'
import SidebarContextProvider from '../context/SidebarContextProvider'
import MenuBar from './MenuBar'
import Sidebar from './Sidebar'

const Layout = ({ title, subTitle, children }: LayoutProps) => {
  return (
    <EditModeContextProvider>
      <DateContextProvider>
        <SidebarContextProvider>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
          <div className="flex h-screen w-full flex-col items-stretch">
            <div className="relative z-10 flex items-center gap-2 border-b border-zinc-300 p-2">
              <Link to="/">
                <Logo className="h-4" />
              </Link>
              <div className="flex-1"></div>
              <MenuBar />
              <UserMenu />
            </div>
            <div className="flex flex-1">
              <div className="flex-1 overflow-hidden">
                {(title || subTitle) && (
                  <div className="mx-auto flex max-w-5xl p-8">
                    {title && <Heading size={1}>{title}</Heading>}
                    {subTitle && <Heading size={2}>{subTitle}</Heading>}
                  </div>
                )}
                {children}
              </div>
              <Sidebar />
            </div>
          </div>
        </SidebarContextProvider>
      </DateContextProvider>
    </EditModeContextProvider>
  )
}

type LayoutProps = {
  title?: string
  subTitle?: string
} & HTMLAttributes<HTMLDivElement>

export default Layout
