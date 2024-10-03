import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react'
import { GroupType } from '../types/groupType'
import { SpaceType } from '../types/spaceType'

type SidebarStateType = {
  title?: string | undefined
  space?: SpaceType | undefined
  group?: GroupType | undefined
}

export type SidebarContextType = {
  sidebarState: SidebarStateType
  setSidebarState: Dispatch<SetStateAction<SidebarStateType>>
}

export const SidebarContext = createContext<SidebarContextType | null>(null)

const SidebarContextProvider = ({ children }: PropsWithChildren) => {
  const [sidebarState, setSidebarState] = useState<SidebarStateType>({
    group: undefined,
    space: undefined,
    title: undefined,
  })

  return (
    <SidebarContext.Provider value={{ sidebarState, setSidebarState }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContextProvider
