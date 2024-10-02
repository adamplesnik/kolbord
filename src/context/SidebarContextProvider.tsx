import { Dispatch, ReactNode, SetStateAction, createContext } from 'react'

export type SidebarStateType = {
  title: string | undefined
}

export type SidebarContextType = {
  sidebarState: SidebarStateType
  setSidebarState: Dispatch<SetStateAction<SidebarStateType>>
}

export const SidebarContext = createContext<SidebarContextType | null>(null)

const SidebarContextProvider = ({ value, children }: SidebarContextProviderProps) => {
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

type SidebarContextProviderProps = {
  value: SidebarContextType
  children: ReactNode
}
export default SidebarContextProvider
