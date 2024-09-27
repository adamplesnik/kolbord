import { OrganizationSwitcher, SignedIn, UserButton } from '@clerk/clerk-react'
import { List, Map } from 'lucide-react'
import { HTMLAttributes } from 'react'
import Button from '../components/basic/Button'
import Logo from '../components/basic/Logo'
import PlanDateSelector, { Value } from '../components/plan/PlanDateSelector'
import PlanSwitcher from '../components/plan/PlanSwitcher'
import { SpaceType } from '../components/space/spaceType'
import { GroupRecord } from '../data/GroupRecord'

const MenuBar = ({
  handleMyBookings,
  handlePlaceAdd,
  handleViewChange,
  listMode,
  onDateChange,
  onGroupEdit,
  onPlanChange,
  onPlanEdit,
  workingDate,
}: MenuBarProps) => {
  return (
    <div className="fixed bottom-2 left-2 z-50 flex items-center gap-3 rounded-xl border border-slate-200/30 border-r-transparent border-l-pink-300/30 bg-white/95 p-2 shadow-2xl">
      <Logo className="h-4" />
      <div className="flex shrink-0 items-center gap-0.5 rounded bg-slate-200/70 p-0.5">
        <PlanSwitcher
          onGroupEdit={(group) => onGroupEdit(group)}
          onPlanEdit={onPlanEdit}
          onPlanChange={onPlanChange}
          handlePlaceAdd={handlePlaceAdd}
          handleMyBookings={handleMyBookings}
        />
        <PlanDateSelector onChange={onDateChange} workingDate={workingDate} />
        <div className="h-6 w-px bg-slate-300"></div>
        <Button Icon={listMode ? List : Map} onClick={handleViewChange} />
      </div>
      <SignedIn>
        <OrganizationSwitcher hidePersonal={true} />
        <UserButton />
      </SignedIn>
    </div>
  )
}

type MenuBarProps = {
  handleMyBookings: () => void
  handlePlaceAdd: (space: SpaceType) => void
  handleViewChange: () => void
  listMode: boolean
  onDateChange: (value: Value) => void
  onGroupEdit: (group: GroupRecord) => void
  onPlanChange: (id: number | undefined) => void
  onPlanEdit: (planId: number | undefined) => void
  workingDate: Value
} & HTMLAttributes<HTMLDivElement>

export default MenuBar
