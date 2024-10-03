import { OrganizationSwitcher, useOrganization, UserButton, useUser } from '@clerk/clerk-react'
import EditButton from '../basic/EditButton'

const pageTitle = (text: string) => {
  return `${text} / Kolbord`
}

const UserMenu = () => {
  const { user } = useUser()
  const { organization } = useOrganization()

  if (organization) {
    document.title = pageTitle(organization.name)
  } else if (user?.fullName) {
    document.title = pageTitle(user.fullName)
  } else {
    document.title = `Kolbord`
  }

  return (
    <>
      <EditButton />
      <OrganizationSwitcher hidePersonal />
      <UserButton />
    </>
  )
}

export default UserMenu
