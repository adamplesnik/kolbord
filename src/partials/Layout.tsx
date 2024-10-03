import { RedirectToSignIn, SignedOut, useAuth } from '@clerk/clerk-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import DateContextProvider, { Value } from '../context/DateContextProvider'
import EditModeContextProvider from '../context/EditModeContextProvider'
import SidebarContextProvider, { SidebarStateType } from '../context/SidebarContextProvider'
import { WORKING_DATE } from '../utils/constants'
import MenuBar from './MenuBar'
import Sidebar from './Sidebar'

const Layout = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const getLocalWorkingDate = localStorage.getItem(WORKING_DATE)
  const { orgId } = useAuth()
  console.log(orgId)

  const [editMode, setEditMode] = useState(false)

  const [date, setDate] = useState<Value>(() => {
    const todayMidnight = new Date(new Date().setHours(0, 0, 0, 0))
    const currentBeforeToday =
      getLocalWorkingDate && new Date(getLocalWorkingDate.toString()) >= todayMidnight
    return currentBeforeToday ? new Date(getLocalWorkingDate.toString()) : todayMidnight
  })

  useEffect(() => {
    date && localStorage.setItem(WORKING_DATE, date.toString())
  }, [date])

  const [sidebarState, setSidebarState] = useState<SidebarStateType>({
    group: undefined,
    space: undefined,
    title: undefined,
  })

  return (
    <EditModeContextProvider value={{ editMode, setEditMode }}>
      <DateContextProvider value={{ date, setDate }}>
        <SidebarContextProvider value={{ sidebarState, setSidebarState }}>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
          <div className="flex h-screen w-full flex-col items-stretch">
            <div className="relative z-10 border-b border-zinc-400">
              <MenuBar
                handleMyBookings={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            </div>
            <div className="flex flex-1">
              <div className="flex-1">{children}</div>
              <Sidebar />
            </div>
          </div>
          {editMode && (
            <div className="pointer-events-none fixed inset-1 rounded-xl border-4 border-red-400"></div>
          )}
        </SidebarContextProvider>
      </DateContextProvider>
    </EditModeContextProvider>
  )
}

export default Layout
