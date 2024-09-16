import { LogIn, LogOut, User } from 'lucide-react'
import { Link, redirect } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { useAuthContext } from '../../auth/AuthContext'
import Button from '../basic/Button'

const UserMenu = ({ handleMyBookings }: UserMenuProps) => {
  const { user, logout } = useAuthContext()

  return (
    <>
      {user ?
        <div data-tooltip-id="userTooltip">
          <Button>{user?.firstName + ' ' + user?.lastName}</Button>
        </div>
      : <Link to="/">
          <Button IconRight={LogIn}>Log in</Button>
        </Link>
      }
      <Tooltip id="userTooltip" clickable openOnClick>
        <div className="flex flex-col gap-1 *:w-full">
          <Button onClick={handleMyBookings} className="w-full" Icon={User}>
            Your bookings
          </Button>
          <Button
            onClick={() => {
              logout()
              redirect('/')
            }}
            Icon={LogOut}
          >
            Log out
          </Button>
        </div>
      </Tooltip>
    </>
  )
}

type UserMenuProps = {
  handleMyBookings: () => void
}

export default UserMenu
