import { X } from 'lucide-react'
import { addWithSpace } from '../utils/addWithSpace'
import Button from './Button'
import { HTMLAttributes, MouseEventHandler } from 'react'

const Sidebar = ({ children, isOpen, closeSidebar, className }: SidebarProps) => {
  return (
    <div
      className={
        'flex h-screen w-xs shrink-0 flex-col overflow-y-scroll border-l bg-slate-200 shadow-2xl' +
        addWithSpace(className) +
        addWithSpace(isOpen ? 'block' : 'hidden')
      }
    >
      <div className="sticky top-0 z-10 bg-gradient-to-b from-slate-200/80 from-60% to-transparent pt-2 px-2 pb-4 text-end">
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
