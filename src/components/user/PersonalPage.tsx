import { SignOutButton, UserProfile } from '@clerk/clerk-react'
import { LogOut } from 'lucide-react'
import Button from '../basic/Button'
import Heading from '../basic/Heading'

const PersonalPage = () => {
  return (
    <div className="mt-12 mx-auto max-w-4xl p-1">
      <div className="flex justify-between">
        <Heading size={2}>Profile</Heading>
        <SignOutButton children={<Button Icon={LogOut}>Sign out</Button>} />
      </div>
      <UserProfile />
    </div>
  )
}

export default PersonalPage
