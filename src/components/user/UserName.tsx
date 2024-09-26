import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const UserName = ({
  subject,
  initials = false,
}: {
  subject: string | null | undefined
  initials?: boolean
}) => {
  const { getToken } = useAuth()
  const getUserName = async () => {
    return await axios.get(`${import.meta.env.VITE_API_URL}/getUser/${subject}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'Content-Type': 'application/json',
      },
    })
  }

  const { data: userName } = useQuery({
    queryFn: () => getUserName(),
    queryKey: ['userName', subject],
  })

  const getInitials = (name: string | undefined | null) => {
    if (name) {
      const names = name.split(' ')
      return names.map((n) => Array.from(n)[0])
    }
  }

  return <>{initials ? getInitials(userName?.data) : userName?.data}</>
}

export default UserName
