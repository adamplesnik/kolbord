import { List, Map } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { useAuthContext } from '../auth/AuthContext'
import Button from '../components/basic/Button'
import Logo from '../components/Logo'
import PlanDateSelector, { Value } from '../components/plan/PlanDateSelector'
import PlanSwitcher from '../components/plan/PlanSwitcher'
import UserMenu from '../components/user/UserMenu'

const MenuBar = ({
  listView,
  workingDate,
  onPlanEdit,
  planId,
  onPlanChange,
  onListChange,
  handlePlaceAdd,
  onDateChange,
}: MenuBarProps) => {
  const { user } = useAuthContext()

  return (
    <div className="fixed bottom-2 left-2 z-50 flex items-center gap-3 rounded-xl border border-slate-200/30 border-r-transparent border-l-pink-300/30 bg-white/95 p-2 shadow-2xl">
      <Logo className="h-5" />
      <UserMenu />
      <div className="flex items-center gap-0.5 rounded bg-slate-200/70 p-0.5">
        {user && !user.error && (
          <>
            <PlanSwitcher
              onPlanEdit={onPlanEdit}
              currentPlan={planId}
              companyId={user.company.id}
              onPlanChange={onPlanChange}
              handlePlaceAdd={handlePlaceAdd}
            />
            <PlanDateSelector onChange={onDateChange} workingDate={workingDate} />
            <div className="h-6 w-px bg-slate-300"></div>
            <Button
              Icon={listView ? List : Map}
              onClick={onListChange}
              data-tooltip-id="view-switch"
            />
            <Tooltip id="view-switch" children={listView ? 'Show plan' : 'Show list'} />
          </>
        )}
      </div>
    </div>
  )
}

type MenuBarProps = {
  onPlanEdit: (planId: number | undefined) => void
  listView: boolean
  planId: number
  workingDate: Value
  onPlanChange: (id: number | undefined) => void
  onListChange: () => void
  handlePlaceAdd: (id: number) => void
  onDateChange: (value: Value) => void
} & HTMLAttributes<HTMLDivElement>

export default MenuBar
