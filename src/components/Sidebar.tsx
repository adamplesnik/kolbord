import { X } from 'lucide-react'
import { addWithSpace } from '../utils/addWithSpace'
import Button from './Button'
import { HTMLAttributes, MouseEventHandler } from 'react'

const Sidebar = ({ children, isOpen, closeSidebar, className }: SidebarProps) => {
  return (
    <div
      className={
        'bg-sidebar flex h-screen w-xs shrink-0 flex-col overflow-y-scroll border-l border-zinc-200/70 shadow-2xl' +
        addWithSpace(className) +
        addWithSpace(isOpen ? 'block' : 'hidden')
      }
    >
      <div className="sticky top-0 z-10 bg-transparent pt-2 px-2 pb-4 text-end backdrop-blur-sm">
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
} & HTMLAttributes<HTMLDivElement>

export default Sidebar
