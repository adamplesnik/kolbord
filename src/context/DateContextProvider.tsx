import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react'
import { WORKING_DATE } from '../utils/constants'

type ValuePiece = Date | null
export type Value = ValuePiece | [ValuePiece, ValuePiece]

type DateContextProviderProps = {
  children: ReactNode
}

const getLocalWorkingDate = localStorage.getItem(WORKING_DATE)

export type DateContextType = {
  date: Value
  setDate: Dispatch<SetStateAction<Value>>
}

export const DateContext = createContext<DateContextType | null>(null)

const DateContextProvider = ({ children }: DateContextProviderProps) => {
  const [date, setDate] = useState<Value>(() => {
    const todayMidnight = new Date(new Date().setHours(0, 0, 0, 0))
    const currentBeforeToday =
      getLocalWorkingDate && new Date(getLocalWorkingDate.toString()) >= todayMidnight
    return currentBeforeToday ? new Date(getLocalWorkingDate.toString()) : todayMidnight
  })

  useEffect(() => {
    date && localStorage.setItem(WORKING_DATE, date.toString())
  }, [date])

  return <DateContext.Provider value={{ date, setDate }}>{children}</DateContext.Provider>
}

export default DateContextProvider
