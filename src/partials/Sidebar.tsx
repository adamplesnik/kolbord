import { X } from 'lucide-react'
import { HTMLAttributes, MouseEventHandler } from 'react'
import Button from '../components/basic/Button'
import { addWithSpace } from '../utils/addWithSpace'

const Sidebar = ({ children, isOpen, closeSidebar, className }: SidebarProps) => {
  return (
    <div
      className={
        'bg-sidebar flex h-screen w-xs shrink-0 flex-col overflow-y-scroll border-l border-slate-200/70 p-8 pt-0 shadow-2xl' +
        addWithSpace(className) +
        addWithSpace(isOpen ? 'block' : 'hidden')
      }
    >
      <div className="sticky top-0 flex items-center justify-end bg-transparent pt-4 pb-8 backdrop-blur-sm">
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
