import {
  OrganizationSwitcher,
  SignOutButton,
  useOrganization,
  UserButton,
  useUser,
} from '@clerk/clerk-react'
import { LogOut } from 'lucide-react'
import { useEffect } from 'react'
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
      <UserButton />
      <OrganizationSwitcher hidePersonal />
      <SignOutButton children={<Button Icon={LogOut} />} />
    </>
  )
}

export default UserMenu
