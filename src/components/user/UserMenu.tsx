import { ListChecks, LogOut } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import { useAuthContext } from '../../auth/AuthContext'
import Button from '../Button'

const UserMenu = () => {
  const { user, logout } = useAuthContext()

  return (
    <>
      <div data-tooltip-id="userTooltip">
        <Button>{user?.name + ' ' + user?.surname}</Button>
      </div>
      <Tooltip id="userTooltip" clickable openOnClick>
        <div className="flex flex-col *:w-full">
          <Button>
            <ListChecks className="size-4" /> My bookings
          </Button>
          <Button onClick={() => logout()}>
            <LogOut className="size-4" /> Logout
          </Button>
        </div>
      </Tooltip>
    </>
  )
}

export default UserMenu
