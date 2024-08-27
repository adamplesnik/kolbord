import { ListChecks, LogIn, LogOut } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import { useAuthContext } from '../../auth/AuthContext'
import Button from '../Button'
import { Link } from 'react-router-dom'

const UserMenu = () => {
  const { user, logout } = useAuthContext()

  return (
    <>
      {user ? (
        <div data-tooltip-id="userTooltip">
          <Button>{user?.name + ' ' + user?.surname}</Button>
        </div>
      ) : (
        <Link to="/login">
          <Button IconRight={LogIn}>Log in</Button>
        </Link>
      )}
      <Tooltip id="userTooltip" clickable openOnClick>
        <div className="flex flex-col *:w-full">
          <Button Icon={ListChecks}>My bookings</Button>
          <Button onClick={() => logout()} Icon={LogOut}></Button>
        </div>
      </Tooltip>
    </>
  )
}

export default UserMenu
