import { useAuth } from '@clerk/clerk-react'
import EditButton from '../basic/EditButton'
import DateSelector from '../basic/PlanDateSelector'
import PlanSwitcher from '../plan/PlanSwitcher'
import ZoneViewSwitcher from '../plan/ZoneViewSwitcher'

const MenuBar = () => {
  const { orgId } = useAuth()

  if (orgId) {
    return (
      <div className="flex items-center rounded-lg bg-slate-200 p-0.5">
        <ZoneViewSwitcher />
        <PlanSwitcher />
        <DateSelector />
        <EditButton />
      </div>
    )
  } else {
    return null
  }
}

export default MenuBar
