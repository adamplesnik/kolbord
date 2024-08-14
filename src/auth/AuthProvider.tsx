import { PropsWithChildren, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { getToken } from './helpers'

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const authToken = getToken()

  const fetchLoggedInUser = async (token: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()

      setUserData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUser = (user: any) => {
    setUserData(user)
  }

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken)
    }
  }, [authToken])

  return (
    <AuthContext.Provider value={{ user: userData, setUser: handleUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
