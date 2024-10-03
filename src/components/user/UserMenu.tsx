import { OrganizationSwitcher, useOrganization, useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../basic/Button'
import EditButton from '../basic/EditButton'

const UserMenu = () => {
  const { user } = useUser()
  const { organization } = useOrganization()

  useEffect(() => {
    const pageTitle = (text: string) => {
      return `${text} / Kolbord`
    }
    if (organization) {
      document.title = pageTitle(organization.name)
    } else if (user?.fullName) {
      document.title = pageTitle(user.fullName)
    } else {
      document.title = `Kolbord`
    }
  }, [organization, user])

  return (
    <>
      <EditButton />
      <NavLink to="/profile" className={({ isActive }) => (isActive ? 'bg-red-300' : '')}>
        <Button>
          <img src={user?.imageUrl} className="size-6 rounded" />
          {user?.firstName}
        </Button>
      </NavLink>
      <OrganizationSwitcher hidePersonal />
    </>
  )
}

export default UserMenu
