import { PropsWithChildren, useEffect, useState } from 'react'
import { AuthContext, User } from './AuthContext'
import { getToken, removeToken } from './helpers'

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState<User>()

  const authToken = getToken()

  const fetchLoggedInUser = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setUserData(data)
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    setUserData(undefined)
    removeToken()
  }

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken)
    }
  }, [authToken])

  return (
    <AuthContext.Provider value={{ user: userData, token: authToken, logout: () => logout() }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
