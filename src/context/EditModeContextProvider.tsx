import { Dispatch, ReactNode, SetStateAction, createContext } from 'react'

export type EditModeContextType = {
  editMode: boolean
  setEditMode: Dispatch<SetStateAction<boolean>>
}

export const EditModeContext = createContext<EditModeContextType | null>(null)

const EditModeContextProvider = ({ value, children }: EditModeContextProviderProps) => {
  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>
}

type EditModeContextProviderProps = {
  value: EditModeContextType
  children: ReactNode
}

export default EditModeContextProvider
