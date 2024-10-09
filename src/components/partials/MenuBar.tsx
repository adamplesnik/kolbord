import { useAuth } from '@clerk/clerk-react'
import { List, Map } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import Button from '../basic/Button'
import DateSelector from '../basic/PlanDateSelector'
import PlanSwitcher from '../plan/PlanSwitcher'

const MenuBar = () => {
  const { orgId } = useAuth()

  if (orgId) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-zinc-200">
        <div className="flex shrink-0 items-center gap-0.5 rounded-md border border-zinc-300 p-0.5">
          <PlanSwitcher />
          <NavLink
            to="/plan"
            className={({ isActive }) => (isActive ? 'text-zinc-900' : 'text-zinc-500')}
          >
            <Button Icon={Map} />
          </NavLink>
          <NavLink
            to="/list"
            className={({ isActive }) => (isActive ? 'text-zinc-900' : 'text-zinc-500')}
          >
            <Button Icon={List} />
          </NavLink>
        </div>
        <DateSelector />
      </div>
    )
  } else {
    return null
  }
}

export default MenuBar
