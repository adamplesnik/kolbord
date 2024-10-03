import { RedirectToSignIn, SignedOut, useAuth } from '@clerk/clerk-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useIsAdmin } from '../auth/useIsAdmin.ts'
import GroupDetail from '../components/group/GroupDetail.tsx'
import Lists from '../components/list/Lists'
import PlanDelete from '../components/plan/PlanDelete.tsx'
import PlanEditor from '../components/plan/PlanEditor'
import PlanTransformWrapper from '../components/plan/PlanTransformWrapper'
import SpaceDelete from '../components/space/SpaceDelete.tsx'
import SpaceDetail from '../components/space/SpaceDetail.tsx'
import SpaceEdit from '../components/space/SpaceEdit.tsx'
import MyBookings from '../components/user/MyBookings.tsx'
import PersonalPage from '../components/user/PersonalPage.tsx'
import DateContextProvider, { Value } from '../context/DateContextProvider.tsx'
import EditModeContextProvider from '../context/EditModeContextProvider.tsx'
import SidebarContextProvider, { SidebarStateType } from '../context/SidebarContextProvider.tsx'
import MenuBar from '../partials/MenuBar'
import Sidebar from '../partials/Sidebar'
import { WORKING_DATE } from '../utils/constants'

const MainPage = () => {
  const { isAdmin } = useIsAdmin()
  const { orgId } = useAuth()
  const getLocalWorkingDate = localStorage.getItem(WORKING_DATE)

  const [sidebarState, setSidebarState] = useState<SidebarStateType>({
    group: undefined,
    space: undefined,
    title: undefined,
  })

  const [date, setDate] = useState<Value>(() => {
    const todayMidnight = new Date(new Date().setHours(0, 0, 0, 0))
    const currentBeforeToday =
      getLocalWorkingDate && new Date(getLocalWorkingDate.toString()) >= todayMidnight
    return currentBeforeToday ? new Date(getLocalWorkingDate.toString()) : todayMidnight
  })

  const [editMode, setEditMode] = useState(false)

  const [bookingsMode, setBookingsMode] = useState(false)
  const [listMode, setListMode] = useState(false)

  useEffect(() => {
    setBookingsMode(bookingsMode)
  }, [bookingsMode])

  const resetSidebar = () => {
    setSidebarState({ title: undefined, space: undefined, group: undefined })
  }

  const sidebarOpen = !!sidebarState.space || editMode || (!!sidebarState.group && editMode)

  console.log(sidebarState)

  const closeSidebar = () => {
    resetSidebar()
  }

  const handleMyBookings = () => {
    setBookingsMode(true)
  }

  useEffect(() => {
    date && localStorage.setItem(WORKING_DATE, date.toString())
  }, [date])

  return (
    <EditModeContextProvider value={{ editMode, setEditMode }}>
      <DateContextProvider value={{ date, setDate }}>
        <SidebarContextProvider value={{ sidebarState, setSidebarState }}>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
          {bookingsMode && <MyBookings />}
          {!orgId && <PersonalPage />}
          {listMode && !bookingsMode && orgId && <Lists />}
          {!listMode && !bookingsMode && orgId && <PlanTransformWrapper />}
          <MenuBar
            handleMyBookings={handleMyBookings}
            handleViewChange={() => setListMode(!listMode)}
            listMode={listMode}
          />
          <Sidebar
            isOpen={sidebarOpen}
            sidebarTitle={sidebarState.title}
            closeSidebar={closeSidebar}
          >
            {sidebarState.group && <GroupDetail />}
            {sidebarState.space && !editMode && <SpaceDetail />}
            {sidebarState.space && editMode && (
              <>
                <SpaceEdit space={sidebarState.space} />
                <SpaceDelete id={sidebarState.space.id} />
              </>
            )}
            {isAdmin && editMode && !sidebarState.space && !sidebarState.group && !listMode && (
              <>
                <PlanEditor />
                <PlanDelete />
              </>
            )}
          </Sidebar>
          {editMode && (
            <div className="pointer-events-none fixed inset-1 rounded-xl border-4 border-red-400"></div>
          )}
        </SidebarContextProvider>
      </DateContextProvider>
    </EditModeContextProvider>
  )
}

export type MainPageProps = HTMLAttributes<HTMLDivElement>

export default MainPage
