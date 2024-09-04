import { X } from 'lucide-react'
import { HTMLAttributes, MouseEventHandler, Suspense } from 'react'
import Button from '../components/basic/Button'
import { addWithSpace } from '../utils/addWithSpace'
import Heading from '../components/basic/Heading'

const Sidebar = ({ children, isOpen, closeSidebar, className, sidebarTitle }: SidebarProps) => {
  return (
    <div
      className={
        'bg-sidebar flex h-screen w-xs shrink-0 flex-col overflow-y-scroll border-l border-slate-200/70 p-8 pt-0 shadow-2xl' +
        addWithSpace(className) +
        addWithSpace(isOpen ? 'block' : 'hidden')
      }
    >
      <div className="sticky top-0 z-10 -mx-8 flex items-center justify-between bg-transparent py-4 px-8 backdrop-blur-sm">
        {sidebarTitle && <Heading size={3}>{sidebarTitle}</Heading>}
        <Button onClick={closeSidebar} className="self-end">
          <X />
        </Button>
      </div>
      {children}
    </div>
  )
}

type SidebarProps = {
  isOpen: boolean
  closeSidebar: MouseEventHandler
  sidebarTitle: string | undefined
} & HTMLAttributes<HTMLDivElement>

export default Sidebar
