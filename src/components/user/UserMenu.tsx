import { OrganizationList, useOrganization, UserButton, useUser } from '@clerk/clerk-react'
import { Building2, CheckCheck, ListChecks, Pencil } from 'lucide-react'
import { useContext } from 'react'
import { EditModeContext, EditModeContextType } from '../../providers/EditModeContextProvider'
import UserBookings from './UserBookings'

const pageTitle = (text: string) => {
  return `${text} / Kolbord`
}

const organizationLabel = (organizationName: string | undefined) => {
  return organizationName || 'Your organizations'
}

const organizationIcon = (imageUrl: string | undefined) => {
  if (imageUrl) {
    return <img src={imageUrl} className="rounded" />
  } else {
    return <Building2 />
  }
}

const UserMenu = () => {
  const { user } = useUser()
  const { organization } = useOrganization()
  const { editMode, setEditMode } = useContext(EditModeContext) as EditModeContextType

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  if (organization) {
    document.title = pageTitle(organization.name)
  } else if (user?.fullName) {
    document.title = pageTitle(user.fullName)
  } else {
    document.title = `Kolbord`
  }

  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Your bookings"
          labelIcon={<ListChecks size={16} />}
          open="bookings"
        />
        <UserButton.Action
          label={organizationLabel(organization?.name)}
          labelIcon={organizationIcon(organization?.imageUrl)}
          open="org"
        />
        <UserButton.Action
          label={editMode ? 'Finish editing' : 'Edit mode'}
          labelIcon={
            editMode ? <CheckCheck size={16} className="text-red-400" /> : <Pencil size={16} />
          }
          onClick={toggleEditMode}
        />
      </UserButton.MenuItems>
      <UserButton.UserProfilePage
        label="Your bookings"
        url="bookings"
        labelIcon={<ListChecks size={16} />}
        children={<UserBookings />}
      />
      <UserButton.UserProfilePage
        children={
          <div className="min-w-xl">
            <OrganizationList hidePersonal />
          </div>
        }
        label={organizationLabel(organization?.name)}
        labelIcon={organizationIcon(organization?.imageUrl)}
        url="org"
      />
    </UserButton>
  )
}

export default UserMenu
