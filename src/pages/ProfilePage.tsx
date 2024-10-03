import { OrganizationSwitcher, SignOutButton, UserProfile } from '@clerk/clerk-react'
import { LogOut } from 'lucide-react'
import Button from '../components/basic/Button'
import Heading from '../components/basic/Heading'
import MyBookings from '../components/user/MyBookings'
import Layout from '../partials/Layout'

const ProfilePage = () => {
  return (
    <Layout>
      <div className="flex">
        <Heading size={2} className="flex-1">
          Profile
        </Heading>
        <OrganizationSwitcher hidePersonal />
        <SignOutButton children={<Button Icon={LogOut}>Sign out</Button>} />
      </div>
      <UserProfile />
      <MyBookings />
    </Layout>
  )
}

export default ProfilePage
