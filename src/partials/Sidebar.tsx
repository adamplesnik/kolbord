import { X } from 'lucide-react'
import { HTMLAttributes, MouseEventHandler } from 'react'
import Button from '../components/basic/Button'
import EditButton from '../components/basic/EditButton'
import Heading from '../components/basic/Heading'
import { addWithSpace } from '../utils/addWithSpace'

const Sidebar = ({
  children,
  isOpen,
  closeSidebar,
  className,
  sidebarTitle,
  handleEditMode,
  editMode,
}: SidebarProps) => {
  return (
    <div
      className={
        'fixed top-2 right-2 bottom-2 flex w-xs shrink-0 flex-col overflow-y-scroll rounded-xl border border-slate-300/50 bg-white/95 p-8 pt-0 shadow-2xl' +
        addWithSpace(className) +
        addWithSpace(isOpen ? 'block' : 'hidden')
      }
    >
      <div className="sticky top-0 z-20 -mx-8 flex items-baseline gap-2 bg-transparent py-4 pt-6 px-8 backdrop-blur-sm">
        <EditButton onClick={handleEditMode} editMode={editMode} />
        {sidebarTitle && <Heading size={3}>{sidebarTitle}</Heading>}
        <div className="flex-1"></div>
        <Button onClick={closeSidebar}>
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
  handleEditMode: () => void
  editMode: boolean
} & HTMLAttributes<HTMLDivElement>

export default Sidebar
