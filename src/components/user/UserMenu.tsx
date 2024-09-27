import { OrganizationList, SignOutButton, useOrganization, useUser } from '@clerk/clerk-react'
import { LogOut } from 'lucide-react'
import { useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import Badge from '../basic/Badge'
import Button from '../basic/Button'

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
      <Button className="min-h-9 shrink-0" data-tooltip-id="user-menu-tooltip">
        <img src={user?.imageUrl} className="size-6 rounded" />
        {user?.firstName}
        {organization?.name && <Badge className="text-sm font-semibold">{organization.name}</Badge>}
        {!organization?.name && <Badge className="text-sm font-semibold">no org</Badge>}
      </Button>
      <Tooltip id="user-menu-tooltip" openOnClick clickable>
        <OrganizationList />
        <SignOutButton children={<Button Icon={LogOut}>Sign out</Button>} />
      </Tooltip>
    </>
  )
}

export default UserMenu
