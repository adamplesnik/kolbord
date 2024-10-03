import { useAuth } from '@clerk/clerk-react'
import { List, Map } from 'lucide-react'
import { HTMLAttributes } from 'react'
import Button from '../components/basic/Button'
import EditButton from '../components/basic/EditButton'
import Logo from '../components/basic/Logo'
import PlanDateSelector from '../components/plan/PlanDateSelector'
import PlanSwitcher from '../components/plan/PlanSwitcher'
import UserMenu from '../components/user/UserMenu'
import { SpaceType } from '../types/spaceType'

const MenuBar = ({
  handleMyBookings,
  handlePlaceAdd,
  handleViewChange,
  listMode,
  onPlanChange,
}: MenuBarProps) => {
  const { orgId } = useAuth()
  return (
    <div className="fixed bottom-2 left-2 z-50 flex items-center gap-3 rounded-xl border border-slate-200/30 border-r-transparent border-l-pink-300/30 bg-white/95 p-2 shadow-2xl">
      <Logo className="h-4" />
      {orgId && (
        <div className="flex h-9 shrink-0 items-center gap-0.5 rounded bg-slate-200/70 p-0.5">
          <PlanSwitcher
            onPlanChange={onPlanChange}
            handlePlaceAdd={handlePlaceAdd}
            handleMyBookings={handleMyBookings}
          />
          <PlanDateSelector />
          <EditButton />
          <div className="h-6 w-px bg-slate-300"></div>
          <Button Icon={listMode ? List : Map} onClick={handleViewChange} />
        </div>
      )}
      <UserMenu />
    </div>
  )
}

type MenuBarProps = {
  handleMyBookings: () => void
  handlePlaceAdd: (space: SpaceType) => void
  handleViewChange: () => void
  listMode: boolean
  onPlanChange: (id: number | undefined) => void
} & HTMLAttributes<HTMLDivElement>

export default MenuBar
