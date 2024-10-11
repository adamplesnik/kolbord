import { RedirectToSignIn, SignedOut } from '@clerk/clerk-react'
import { Link, Outlet } from 'react-router-dom'
import Logo from '../basic/Logo'
import MenuBar from '../partials/MenuBar'
import Sidebar from '../partials/Sidebar'
import UserMenu from '../user/UserMenu'

const Layout = () => {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <div className="fixed bottom-0 z-20 flex h-14 w-full items-center gap-2 py-2 px-4 backdrop-blur-sm sm:justify-between md:top-0 md:bottom-auto">
        <Link to="/">
          <Logo className="ml-1 h-8 sm:ml-0 sm:h-4" />
        </Link>
        <span className="flex-1 sm:hidden"></span>
        <MenuBar />
        <UserMenu />
      </div>
      <div className="m-4 mb-14 overflow-hidden rounded-xl bg-white md:mt-14 md:mb-4">
        <Outlet />
      </div>
      <Sidebar />
    </>
  )
}

export default Layout
