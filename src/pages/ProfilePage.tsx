import { SignOutButton, UserProfile } from '@clerk/clerk-react'
import { LogOut } from 'lucide-react'
import Button from '../components/basic/Button'
import Heading from '../components/basic/Heading'
import MyBookings from '../components/user/MyBookings'
import Layout from '../partials/Layout'

const ProfilePage = () => {
  return (
    <Layout title="Profile">
      <div className="mx-auto max-w-5xl p-8">
        <div className="flex">
          <Heading size={1}>Profile</Heading>
          <SignOutButton children={<Button Icon={LogOut}>Sign out</Button>} />
        </div>
        <UserProfile />
        <MyBookings />
      </div>
    </Layout>
  )
}

export default ProfilePage
