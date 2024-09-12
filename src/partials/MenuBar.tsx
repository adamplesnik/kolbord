import { Ellipsis, List, Map, User } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { useAuthContext } from '../auth/AuthContext'
import Button from '../components/basic/Button'
import Logo from '../components/Logo'
import PlanDateSelector, { Value } from '../components/plan/PlanDateSelector'
import PlanSwitcher from '../components/plan/PlanSwitcher'
import UserMenu from '../components/user/UserMenu'

const MenuBar = ({
  workingDate,
  onPlanEdit,
  planId,
  onPlanChange,
  onListChange,
  handlePlaceAdd,
  onDateChange,
  viewMode,
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
            <Button Icon={Ellipsis} data-tooltip-id="view-switch" />
            <Tooltip id="view-switch" clickable openOnClick>
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => onListChange('plan')}
                  className="w-full"
                  active={viewMode === 'plan'}
                  Icon={Map}
                  iconClassName={viewMode === 'plan' ? 'opacity-85' : 'opacity-35'}
                >
                  Plan
                </Button>
                <Button
                  onClick={() => onListChange('list')}
                  className="w-full"
                  active={viewMode === 'list'}
                  Icon={List}
                  iconClassName={viewMode === 'list' ? 'opacity-85' : 'opacity-35'}
                >
                  List
                </Button>
                <Button
                  onClick={() => onListChange('bookings')}
                  className="w-full"
                  active={viewMode === 'bookings'}
                  Icon={User}
                  iconClassName={viewMode === 'bookings' ? 'opacity-85' : 'opacity-35'}
                >
                  My bookings
                </Button>
              </div>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  )
}

type MenuBarProps = {
  onPlanEdit: (planId: number | undefined) => void
  viewMode: 'plan' | 'list' | 'bookings'
  planId: number
  workingDate: Value
  onPlanChange: (id: number | undefined) => void
  onListChange: (mode: 'plan' | 'list' | 'bookings') => void
  handlePlaceAdd: (id: number) => void
  onDateChange: (value: Value) => void
} & HTMLAttributes<HTMLDivElement>

export default MenuBar
