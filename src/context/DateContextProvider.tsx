import { Dispatch, ReactNode, SetStateAction, createContext } from 'react'

type ValuePiece = Date | null
export type Value = ValuePiece | [ValuePiece, ValuePiece]

export type DateContextType = {
  date: Value
  setDate: Dispatch<SetStateAction<Value>>
}

export const DateContext = createContext<DateContextType | null>(null)

const DateContextProvider = ({ value, children }: DateContextProviderProps) => {
  return <DateContext.Provider value={value}>{children}</DateContext.Provider>
}

type DateContextProviderProps = {
  value: DateContextType
  children: ReactNode
}

export default DateContextProvider
