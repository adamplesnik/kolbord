import { useAuth } from '@clerk/clerk-react'
import { List, Map, User2 } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import Button from '../basic/Button'
import PlanDateSelector from '../plan/PlanDateSelector'
import PlanSwitcher from '../plan/PlanSwitcher'

const MenuBar = () => {
  const { orgId } = useAuth()
  return (
    <>
      {orgId && (
        <div className="flex h-9 shrink-0 items-center gap-0.5 rounded bg-slate-200/70 p-0.5">
          <PlanSwitcher />
          <NavLink
            to="/plan"
            className={({ isActive }) => (isActive ? 'text-black' : 'text-zinc-500')}
          >
            <Button Icon={Map} />
          </NavLink>
          <NavLink
            to="/list"
            className={({ isActive }) => (isActive ? 'text-black' : 'text-zinc-500')}
          >
            <Button Icon={List} />
          </NavLink>
          <div className="h-6 w-px bg-zinc-300"></div>
          <NavLink
            to="/bookings"
            className={({ isActive }) => (isActive ? 'text-black' : 'text-zinc-500')}
          >
            <Button Icon={User2} />
          </NavLink>
          <PlanDateSelector />
        </div>
      )}
    </>
  )
}

export default MenuBar
