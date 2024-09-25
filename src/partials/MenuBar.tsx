import { OrganizationSwitcher, SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import { List, Map } from 'lucide-react'
import { HTMLAttributes } from 'react'
import Button from '../components/basic/Button'
import Logo from '../components/Logo'
import PlanDateSelector, { Value } from '../components/plan/PlanDateSelector'
import PlanSwitcher from '../components/plan/PlanSwitcher'
import { SpaceType } from '../components/space/spaceType'
import { GroupRecord } from '../data/GroupRecord'

const MenuBar = ({
  handleGroupAdd,
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
  const { user } = useUser()

  return (
    <div className="fixed bottom-2 left-2 z-50 flex items-center gap-3 rounded-xl border border-slate-200/30 border-r-transparent border-l-pink-300/30 bg-white/95 p-2 shadow-2xl">
      <Logo className="h-5" />
      <div className="flex items-center gap-0.5 rounded bg-slate-200/70 p-0.5">
        {user && (
          <>
            <PlanSwitcher
              onGroupEdit={(group) => onGroupEdit(group)}
              onPlanEdit={onPlanEdit}
              onPlanChange={onPlanChange}
              handlePlaceAdd={handlePlaceAdd}
              handleGroupAdd={handleGroupAdd}
              handleMyBookings={handleMyBookings}
            />
            <PlanDateSelector onChange={onDateChange} workingDate={workingDate} />
            <div className="h-6 w-px bg-slate-300"></div>
            <Button Icon={listMode ? List : Map} onClick={handleViewChange} />
          </>
        )}
      </div>
      <SignedIn>
        <OrganizationSwitcher />
        <UserButton />
      </SignedIn>
    </div>
  )
}

type MenuBarProps = {
  handleGroupAdd: () => void
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
