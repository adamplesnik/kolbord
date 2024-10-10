import { useAuth } from '@clerk/clerk-react'
import DateSelector from '../basic/DateSelector'
import EditButton from '../basic/EditButton'
import Separator from '../basic/Separator'
import PlanSwitcher from '../plan/PlanSwitcher'
import ZoneViewSwitcher from '../plan/ZoneViewSwitcher'

const MenuBar = () => {
  const { orgId } = useAuth()

  if (orgId) {
    return (
      <div className="flex items-center">
        <ZoneViewSwitcher />
        <PlanSwitcher />
        <Separator className="mx-2 h-8 rotate-12 bg-zinc-400" vertical />
        <DateSelector />
        <EditButton />
      </div>
    )
  } else {
    return null
  }
}

export default MenuBar
