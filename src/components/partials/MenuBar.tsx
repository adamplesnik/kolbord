import { useAuth } from '@clerk/clerk-react'
import DateSelector from '../basic/DateSelector'
import ZoneSwitcher from '../zone/ZoneSwitcher'
import ZoneViewSwitcher from '../zone/ZoneViewSwitcher'

const MenuBar = () => {
  const { orgId } = useAuth()

  if (orgId) {
    return (
      <div className="flex items-center">
        <ZoneViewSwitcher />
        <ZoneSwitcher />
        <span className="w-2" />
        <DateSelector />
      </div>
    )
  } else {
    return null
  }
}

export default MenuBar
