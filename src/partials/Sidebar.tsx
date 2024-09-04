import { X } from 'lucide-react'
import { HTMLAttributes, MouseEventHandler } from 'react'
import Button from '../components/basic/Button'
import Heading from '../components/basic/Heading'
import { addWithSpace } from '../utils/addWithSpace'

const Sidebar = ({ children, isOpen, closeSidebar, className, sidebarTitle }: SidebarProps) => {
  return (
    <div
      className={
        'fixed top-2 right-2 bottom-2 flex w-xs shrink-0 flex-col overflow-y-scroll rounded-xl border border-slate-300/50 bg-white/95 p-8 pt-0 shadow-2xl' +
        addWithSpace(className) +
        addWithSpace(isOpen ? 'block' : 'hidden')
      }
    >
      <div className="sticky top-0 z-10 -mx-8 flex items-center justify-between bg-transparent py-4 pt-6 px-8 backdrop-blur-sm">
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
