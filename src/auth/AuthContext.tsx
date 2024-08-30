import { createContext, useContext } from 'react'

export type User = {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
  role: {
    id: number
  }
  company: {
    id: number
    name: string
    uuid: string
  }
}

interface ProviderProps {
  user: User | undefined
  token: string | null
  logout(): void
}

export const AuthContext = createContext<ProviderProps>({
  user: undefined,
  token: '',
  logout: () => {},
})

export const useAuthContext = () => useContext(AuthContext)
