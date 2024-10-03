import { useAuth } from '@clerk/clerk-react'
import { List, Map } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/basic/Button'
import EditButton from '../components/basic/EditButton'
import Logo from '../components/basic/Logo'
import PlanDateSelector from '../components/plan/PlanDateSelector'
import PlanSwitcher from '../components/plan/PlanSwitcher'
import UserMenu from '../components/user/UserMenu'

const MenuBar = ({ handleMyBookings }: MenuBarProps) => {
  const { orgId } = useAuth()
  return (
    <div className="flex w-full items-center gap-3 p-2">
      <Logo className="h-4" />
      {orgId && (
        <div className="flex h-9 shrink-0 items-center gap-0.5 rounded bg-slate-200/70 p-0.5">
          <PlanSwitcher handleMyBookings={handleMyBookings} />
          <PlanDateSelector />
          <EditButton />
          <div className="h-6 w-px bg-slate-300"></div>
          <Link to="/plan">
            <Button Icon={Map} />
          </Link>
          <Link to="/list">
            <Button Icon={List} />
          </Link>
        </div>
      )}
      <div className="flex-1"></div>
      <UserMenu />
    </div>
  )
}

type MenuBarProps = {
  handleMyBookings: () => void
} & HTMLAttributes<HTMLDivElement>

export default MenuBar
