import { OrganizationSwitcher, useOrganization, UserButton, useUser } from '@clerk/clerk-react'
import { ListChecks } from 'lucide-react'
import EditButton from '../basic/EditButton'
import YourBookings from './YourBookings'

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
      <UserButton showName>
        <UserButton.UserProfilePage
          label="Your bookings"
          url="custom"
          labelIcon={<ListChecks size={16} />}
          children={<YourBookings />}
        />
      </UserButton>
    </>
  )
}

export default UserMenu
