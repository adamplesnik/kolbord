import { OrganizationList, SignOutButton, useOrganization, useUser } from '@clerk/clerk-react'
import { LogOut } from 'lucide-react'
import { useEffect } from 'react'
import Badge from '../basic/Badge'
import Button from '../basic/Button'
import CustomTooltip from '../basic/CustomTooltip'

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
      <CustomTooltip id="user-menu-tooltip" openOnClick clickable noArrow>
        <OrganizationList />
        <SignOutButton children={<Button Icon={LogOut}>Sign out</Button>} />
      </CustomTooltip>
    </>
  )
}

export default UserMenu
