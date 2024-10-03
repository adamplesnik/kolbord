import clsx from 'clsx'
import { X } from 'lucide-react'
import { useContext } from 'react'
import { useIsAdmin } from '../auth/useIsAdmin'
import Button from '../components/basic/Button'
import Heading from '../components/basic/Heading'
import GroupDetail from '../components/group/GroupDetail'
import PlanDelete from '../components/plan/PlanDelete'
import PlanEditor from '../components/plan/PlanEditor'
import SpaceDelete from '../components/space/SpaceDelete'
import SpaceDetail from '../components/space/SpaceDetail'
import SpaceEdit from '../components/space/SpaceEdit'
import { EditModeContext, EditModeContextType } from '../context/EditModeContextProvider'
import { SidebarContext, SidebarContextType } from '../context/SidebarContextProvider'

const Sidebar = () => {
  const { isAdmin } = useIsAdmin()
  const { editMode } = useContext(EditModeContext) as EditModeContextType
  const { sidebarState, setSidebarState } = useContext(SidebarContext) as SidebarContextType

  const sidebarOpen = !!sidebarState.space || editMode || (!!sidebarState.group && editMode)

  const closeSidebar = () =>
    setSidebarState({ title: undefined, space: undefined, group: undefined })

  return (
    <div
      className={clsx(
        'flex w-xs shrink-0 flex-col overflow-y-scroll border-l border-zinc-400 p-8 pt-0',
        sidebarOpen ? 'block' : 'hidden'
      )}
    >
      <div className="sticky top-0 z-20 -mx-8 flex items-baseline gap-2 bg-transparent py-4 pt-6 px-8 backdrop-blur-sm">
        {sidebarState.title && <Heading size={3}>{sidebarState.title}</Heading>}
        <div className="flex-1"></div>
        <Button onClick={closeSidebar}>
          <X />
        </Button>
      </div>
      {sidebarState.group && <GroupDetail />}
      {sidebarState.space && !editMode && <SpaceDetail />}
      {sidebarState.space && editMode && (
        <>
          <SpaceEdit space={sidebarState.space} />
          <SpaceDelete id={sidebarState.space.id} />
        </>
      )}
      {isAdmin && editMode && !sidebarState.space && !sidebarState.group && (
        <>
          <PlanEditor />
          <PlanDelete />
        </>
      )}
    </div>
  )
}

export default Sidebar
