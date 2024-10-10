import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useContext } from 'react'
import { useIsAdmin } from '../../hooks/useIsAdmin'
import { EditModeContext, EditModeContextType } from '../../providers/EditModeContextProvider'
import { SidebarContext, SidebarContextType } from '../../providers/SidebarContextProvider'
import Button from '../basic/Button'
import Heading from '../basic/Heading'
import GroupDetail from '../group/GroupDetail'
import SpaceDelete from '../space/SpaceDelete'
import SpaceDetail from '../space/SpaceDetail'
import SpaceEdit from '../space/SpaceEdit'
import PlanDelete from '../zone/ZoneDelete'
import PlanEditor from '../zone/ZoneEditor'

const Sidebar = () => {
  const { isAdmin } = useIsAdmin()
  const { editMode } = useContext(EditModeContext) as EditModeContextType
  const { sidebarState, setSidebarState } = useContext(SidebarContext) as SidebarContextType

  const sidebarOpen = !!sidebarState.space || editMode

  const closeSidebar = () =>
    setSidebarState({ title: undefined, space: undefined, group: undefined })

  return (
    <AnimatePresence initial={false}>
      {sidebarOpen && (
        <motion.div
          initial={{ x: 320 }}
          animate={{ x: 0 }}
          exit={{ x: 320 }}
          transition={{ ease: 'anticipate', duration: 0.3 }}
          className={clsx(
            'peer fixed top-16 right-2 bottom-2 z-10 flex max-h-screen w-xs flex-col overflow-y-scroll rounded-lg border border-zinc-400 bg-white/95 p-4 pt-0 shadow-xl',
            sidebarOpen ? 'block' : 'hidden'
          )}
        >
          <div className="sticky top-0 z-20 -mx-4 mb-6 flex items-baseline gap-2 bg-transparent bg-gradient-to-b from-white/90 from-60% pt-4 px-4 pb-2">
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
