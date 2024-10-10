import { RedirectToSignIn, SignedOut } from '@clerk/clerk-react'
import clsx from 'clsx'
import { Sidebar } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Logo from '../basic/Logo'
import MenuBar from '../partials/MenuBar'
import UserMenu from '../user/UserMenu'

const Layout = ({ fullSize = false }: LayoutProps) => {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <div className="fixed top-0 z-10 flex h-14 w-full items-center justify-between gap-2 py-2 px-4 backdrop-blur-sm">
        <Link to="/">
          <Logo className="h-4" />
        </Link>
        <MenuBar />
        <UserMenu />
      </div>
      <div
        className={clsx(
          'm-4 mt-14 rounded-xl bg-white',
          fullSize && 'relative h-[calc(100vh_-_4.5rem)] overflow-hidden'
        )}
      >
        <Outlet />
      </div>
      <Sidebar />
    </>
  )
}

type LayoutProps = {
  fullSize?: boolean | undefined
  subTitle?: string
  title?: string
} & HTMLAttributes<HTMLDivElement>

export default Layout
