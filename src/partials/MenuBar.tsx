import { SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import { List, Map } from 'lucide-react'
import { HTMLAttributes } from 'react'
import Button from '../components/basic/Button'
import Logo from '../components/Logo'
import PlanDateSelector, { Value } from '../components/plan/PlanDateSelector'
import PlanSwitcher from '../components/plan/PlanSwitcher'

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
  planId,
  workingDate,
}: MenuBarProps) => {
  const { user } = useUser()
  console.log(user?.organizationMemberships)

  return (
    <div className="fixed bottom-2 left-2 z-50 flex items-center gap-3 rounded-xl border border-slate-200/30 border-r-transparent border-l-pink-300/30 bg-white/95 p-2 shadow-2xl">
      <Logo className="h-5" />
      <div className="flex items-center gap-0.5 rounded bg-slate-200/70 p-0.5">
        {user && (
          <>
            <PlanSwitcher
              onGroupEdit={(groupId) => onGroupEdit(groupId)}
              onPlanEdit={onPlanEdit}
              currentPlan={planId}
              companyId={1}
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
        <UserButton />
      </SignedIn>
    </div>
  )
}

type MenuBarProps = {
  handleGroupAdd: () => void
  handleMyBookings: () => void
  handlePlaceAdd: (id: number) => void
  handleViewChange: () => void
  listMode: boolean
  onDateChange: (value: Value) => void
  onGroupEdit: (groupId: number) => void
  onPlanChange: (id: number | undefined) => void
  onPlanEdit: (planId: number | undefined) => void
  planId: number
  workingDate: Value
} & HTMLAttributes<HTMLDivElement>

export default MenuBar
