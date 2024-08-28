import { X } from 'lucide-react'
import { HTMLAttributes, MouseEventHandler } from 'react'
import { addWithSpace } from '../utils/addWithSpace'
import Button from '../components/basic/Button'

const Sidebar = ({ children, isOpen, closeSidebar, className, editMode }: SidebarProps) => {
  return (
    <div
      className={
        'bg-sidebar flex h-screen w-xs shrink-0 flex-col overflow-y-scroll border-l border-slate-200/70 shadow-2xl' +
        addWithSpace(className) +
        addWithSpace(isOpen ? 'block' : 'hidden')
      }
    >
      <div className="sticky top-0 z-10 flex items-center justify-end bg-transparent pt-2 px-2 pb-4 backdrop-blur-sm">
        {editMode && (
          <span className="rounded border border-red-600 bg-red-100 p-2 text-xs font-semibold">
            Edit mode
          </span>
        )}
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
  editMode: boolean
} & HTMLAttributes<HTMLDivElement>

export default Sidebar
