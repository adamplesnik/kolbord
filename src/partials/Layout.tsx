import { RedirectToSignIn, SignedOut } from '@clerk/clerk-react'
import clsx from 'clsx'
import { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import Heading from '../components/basic/Heading'
import Logo from '../components/basic/Logo'
import UserMenu from '../components/user/UserMenu'
import MenuBar from './MenuBar'
import Sidebar from './Sidebar'

const Layout = ({ fullSize = false, title, subTitle, children }: LayoutProps) => {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <div className="fixed top-0 z-10 flex h-14 w-full items-center gap-2 border-t border-zinc-400 bg-white/50 py-2 px-4 backdrop-blur-sm md:order-first md:border-b md:border-t-transparent">
        <Link to="/">
          <Logo className="h-4" />
        </Link>
        <div className="flex-1"></div>
        <MenuBar />
        <UserMenu />
      </div>
      <div className={clsx('flex flex-1', fullSize && 'h-screen overflow-hidden')}>
        <div className={clsx('flex-1', fullSize && 'overflow-hidden')}>
          {(title || subTitle) && !fullSize && (
            <div className="mx-auto flex max-w-5xl p-8 pt-24">
              {title && <Heading size={1}>{title}</Heading>}
              {subTitle && <Heading size={2}>{subTitle}</Heading>}
            </div>
          )}
          {children}
        </div>
        <Sidebar />
      </div>
    </>
  )
}

type LayoutProps = {
  fullSize?: boolean | undefined
  subTitle?: string
  title?: string
} & HTMLAttributes<HTMLDivElement>

export default Layout
