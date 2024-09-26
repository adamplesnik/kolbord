import { useAuth } from '@clerk/clerk-react'

export const useIsAdmin = () => {
  const { orgRole } = useAuth()

  return { isAdmin: orgRole === 'org:admin' }
}
