import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

export type EditModeContextType = {
  editMode: boolean
  setEditMode: Dispatch<SetStateAction<boolean>>
}

export const EditModeContext = createContext<EditModeContextType | null>(null)

const EditModeContextProvider = ({ children }: EditModeContextProviderProps) => {
  const [editMode, setEditMode] = useState(false)

  return (
    <EditModeContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </EditModeContext.Provider>
  )
}

type EditModeContextProviderProps = {
  children: ReactNode
}

export default EditModeContextProvider
