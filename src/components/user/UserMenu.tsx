import { LogIn, LogOut } from 'lucide-react'
import { Link, redirect } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { useAuthContext } from '../../auth/AuthContext'
import Button from '../basic/Button'

const UserMenu = () => {
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
        <div className="flex flex-col *:w-full">
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

export default UserMenu
