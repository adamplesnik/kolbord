import clsx from 'clsx'
import { List, Map } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import Button from '../basic/Button'

const ZoneViewSwitcher = () => {
  const location = useLocation()
  const isList = location.pathname.includes('list')

  return (
    <div className={clsx('h-8 shrink-0 overflow-hidden')}>
      <div
        className={clsx(
          'flex flex-col transition-transform delay-100 duration-500 ease-in-out',
          isList && '-translate-y-8'
        )}
      >
        <NavLink to="/list">
          <Button Icon={Map} buttonType="menu" />
        </NavLink>
        <NavLink to="/plan">
          <Button Icon={List} buttonType="menu" />
        </NavLink>
      </div>
    </div>
  )
}

export default ZoneViewSwitcher
