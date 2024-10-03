import { SignOutButton, UserProfile } from '@clerk/clerk-react'
import { LogOut } from 'lucide-react'
import Button from '../components/basic/Button'
import Heading from '../components/basic/Heading'
import Layout from '../partials/Layout'

const ProfilePage = () => {
  return (
    <Layout>
      <Heading size={2}>Profile</Heading>
      <SignOutButton children={<Button Icon={LogOut}>Sign out</Button>} />

      <UserProfile />
    </Layout>
  )
}

export default ProfilePage
