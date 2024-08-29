import { X } from 'lucide-react'
import { HTMLAttributes, MouseEventHandler } from 'react'
import Button from '../components/basic/Button'
import PlanEdit from '../components/plan/PlanEdit'
import { addWithSpace } from '../utils/addWithSpace'

const Sidebar = ({
  children,
  isOpen,
  closeSidebar,
  className,
  editMode,
  handleEditMode,
  handlePlaceAdd,
  planId,
}: SidebarProps) => {
  return (
    <div
      className={
        'bg-sidebar flex h-screen w-xs shrink-0 flex-col overflow-y-scroll border-l border-slate-200/70 shadow-2xl' +
        addWithSpace(className) +
        addWithSpace(isOpen ? 'block' : 'hidden')
      }
    >
      <div className="sticky top-0 z-10 flex items-center justify-end bg-transparent pt-2 px-2 pb-4 backdrop-blur-sm">
        <PlanEdit
          planId={planId}
          editMode={editMode}
          handleEditModeChange={handleEditMode}
          handlePlaceAdd={handlePlaceAdd}
        />
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
  handleEditMode: () => void
  handlePlaceAdd: (id: number) => void
  planId: number
} & HTMLAttributes<HTMLDivElement>

export default Sidebar
