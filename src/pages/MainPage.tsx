import { RedirectToSignIn, SignedOut, useAuth } from '@clerk/clerk-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useIsAdmin } from '../auth/useIsAdmin.ts'
import GroupDetail from '../components/group/GroupDetail.tsx'
import Lists from '../components/list/Lists'
import { Value } from '../components/plan/PlanDateSelector.tsx'
import PlanDelete from '../components/plan/PlanDelete.tsx'
import PlanEditor from '../components/plan/PlanEditor'
import PlanTransformWrapper from '../components/plan/PlanTransformWrapper'
import SpaceDelete from '../components/space/SpaceDelete.tsx'
import SpaceDetail from '../components/space/SpaceDetail.tsx'
import SpaceEdit from '../components/space/SpaceEdit.tsx'
import MyBookings from '../components/user/MyBookings.tsx'
import PersonalPage from '../components/user/PersonalPage.tsx'
import SidebarContextProvider, { SidebarStateType } from '../context/SidebarContextProvider.tsx'
import MenuBar from '../partials/MenuBar'
import Sidebar from '../partials/Sidebar'
import { GroupType } from '../types/groupType'
import { SpaceType } from '../types/spaceType'
import { WORKING_DATE } from '../utils/constants'

const MainPage = () => {
  const { isAdmin } = useIsAdmin()
  const { orgId } = useAuth()
  const getLocalWorkingDate = localStorage.getItem(WORKING_DATE)
  const [sidebarState, setSidebarState] = useState<SidebarStateType>({
    title: undefined,
    space: undefined,
  })

  const [bookingsMode, setBookingsMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [listMode, setListMode] = useState(false)
  const [sidebarGroup, setSidebarGroup] = useState<GroupType | undefined>(undefined)
  const [sidebarPlanEdit, setSidebarPlanEdit] = useState(false)
  const [workingDate, setWorkingDate] = useState<Value>(() => {
    const todayMidnight = new Date(new Date().setHours(0, 0, 0, 0))
    const currentBeforeToday =
      getLocalWorkingDate && new Date(getLocalWorkingDate.toString()) >= todayMidnight
    return currentBeforeToday ? new Date(getLocalWorkingDate.toString()) : todayMidnight
  })

  useEffect(() => {
    setWorkingDate(workingDate)
  }, [workingDate])

  useEffect(() => {
    setBookingsMode(bookingsMode)
  }, [bookingsMode])

  const resetSidebar = () => {
    setSidebarState({ title: undefined, space: undefined })
  }

  const sidebarOpen =
    sidebarState.space != undefined ||
    (sidebarPlanEdit && editMode) ||
    (sidebarGroup != undefined && editMode)

  const closeSidebar = () => {
    setEditMode(false)
    setSidebarGroup(undefined)
    setSidebarPlanEdit(false)
    setSidebarState({ title: undefined, space: undefined })
  }

  const handlePlanIdChange = (id: number | undefined) => {
    if (id) {
      resetSidebar()
    }
  }

  const handlePlaceClick = (space: SpaceType) => {
    setSidebarState({ space: space })
    setSidebarGroup(undefined)
    setSidebarPlanEdit(false)
  }

  const onPlanEdit = () => {
    setListMode(false)
    setBookingsMode(false)
    setSidebarPlanEdit(true)
    setSidebarState({ space: undefined })
    setSidebarGroup(undefined)
    setEditMode(true)
  }

  const onGroupEdit = (group: GroupType) => {
    setSidebarGroup(group)
    setSidebarState({ space: undefined })
    setEditMode(true)
    setSidebarPlanEdit(false)
  }

  const handleMyBookings = () => {
    setBookingsMode(true)
  }

  useEffect(() => {
    workingDate && localStorage.setItem(WORKING_DATE, workingDate.toString())
  }, [workingDate])

  return (
    <>
      <SidebarContextProvider value={{ sidebarState, setSidebarState }}>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        {bookingsMode && <MyBookings workingDate={workingDate} />}
        {!orgId && <PersonalPage />}
        {listMode && !bookingsMode && orgId && <Lists workingDate={workingDate} />}
        {!listMode && !bookingsMode && orgId && <PlanTransformWrapper workingDate={workingDate} />}
        <MenuBar
          handleMyBookings={handleMyBookings}
          handleViewChange={() => setListMode(!listMode)}
          listMode={listMode}
          onDateChange={(value) => setWorkingDate(value)}
          onPlanChange={handlePlanIdChange}
          onPlanEdit={onPlanEdit}
          onGroupEdit={onGroupEdit}
          workingDate={workingDate}
          handlePlaceAdd={(space) => {
            handlePlaceClick(space)
            setEditMode(true)
          }}
        />
        <Sidebar
          editMode={editMode}
          handleEditMode={() => setEditMode(!editMode)}
          isOpen={sidebarOpen}
          sidebarTitle={sidebarState.title}
          closeSidebar={closeSidebar}
        >
          {sidebarGroup != undefined && <GroupDetail group={sidebarGroup} />}
          {sidebarState.space && !editMode && <SpaceDetail workingDate={workingDate?.toString()} />}
          {sidebarState.space && editMode && (
            <>
              <SpaceEdit space={sidebarState.space} />
              <SpaceDelete id={sidebarState.space.id} />
            </>
          )}
          {isAdmin && sidebarPlanEdit && editMode && (
            <>
              <PlanEditor />
              <PlanDelete
                handleDelete={() => {
                  setSidebarPlanEdit(false)
                }}
              />
            </>
          )}
        </Sidebar>
      </SidebarContextProvider>
    </>
  )
}

export type MainPageProps = HTMLAttributes<HTMLDivElement>

export default MainPage
