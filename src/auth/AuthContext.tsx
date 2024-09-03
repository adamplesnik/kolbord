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
  onboardingCompanyName?: string | undefined
  role: {
    id: number
  }
  company: {
    id: number
    name: string
    uuid: string
  }
  error?: {
    message: string
  }
}

interface ProviderProps {
  user: User | undefined
  userCanEdit: boolean | undefined
  token: string | null
  logout(): void
}

export const AuthContext = createContext<ProviderProps>({
  user: undefined,
  token: '',
  userCanEdit: false,
  logout: () => {},
})

export const useAuthContext = () => useContext(AuthContext)
