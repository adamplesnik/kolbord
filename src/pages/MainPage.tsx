import { RedirectToSignIn, SignedOut } from '@clerk/clerk-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useAuthContext } from '../auth/AuthContext'
import GroupDetail from '../components/group/GroupDetail.tsx'
import Lists from '../components/list/Lists'
import { Value } from '../components/plan/PlanDateSelector.tsx'
import PlanEditor from '../components/plan/PlanEditor'
import PlanTransformWrapper from '../components/plan/PlanTransformWrapper'
import SpaceDetail from '../components/space/SpaceDetail.tsx'
import MyBookings from '../components/user/MyBookings.tsx'
import MenuBar from '../partials/MenuBar'
import Sidebar from '../partials/Sidebar'
import { LATEST_PLAN_ID, WORKING_DATE } from '../utils/constants'

const MainPage = () => {
  const { userCanEdit } = useAuthContext()

  const getLocalWorkingDate = localStorage.getItem(WORKING_DATE)

  const [bookingsMode, setBookingsMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [listMode, setListMode] = useState(false)
  const [planId, setPlanId] = useState(0)
  const [sidebarGroupId, setSidebarGroupId] = useState(0)
  const [sidebarPlanEdit, setSidebarPlanEdit] = useState(false)
  const [sidebarTableId, setSidebarTableId] = useState(0)
  const [sidebarTitle, setSidebarTitle] = useState<string | undefined>(undefined)
  const [workingDate, setWorkingDate] = useState<Value>(() => {
    const todayMidnight = new Date(new Date().setHours(0, 0, 0, 0))
    const currentBeforeToday =
      getLocalWorkingDate && new Date(getLocalWorkingDate.toString()) >= todayMidnight
    return currentBeforeToday ? new Date(getLocalWorkingDate.toString()) : todayMidnight
  })

  useEffect(() => {
    setSidebarTitle(sidebarTitle)
  }, [sidebarTitle])

  useEffect(() => {
    setWorkingDate(workingDate)
  }, [workingDate])

  useEffect(() => {
    setPlanId(planId)
  }, [planId])

  useEffect(() => {
    setBookingsMode(bookingsMode)
  }, [bookingsMode])

  const sidebarOpen =
    sidebarTableId > 0 || (sidebarPlanEdit && editMode) || (sidebarGroupId > 0 && editMode)

  const closeSidebar = () => {
    setEditMode(false)
    setSidebarGroupId(0)
    setSidebarPlanEdit(false)
    setSidebarTableId(0)
  }

  const handlePlanIdChange = (id: number | undefined) => {
    if (id) {
      setPlanId(id)
      setSidebarTableId(0)
      setSidebarGroupId(0)
      setBookingsMode(false)
      localStorage.setItem(LATEST_PLAN_ID, id.toString())
    }
  }

  const handleGroupAdd = () => {
    setSidebarTableId(0)
  }

  const handlePlaceClick = (id: number) => {
    setSidebarTableId(id)
    setSidebarGroupId(0)
    setSidebarPlanEdit(false)
  }

  const onPlanEdit = (planId: number | undefined) => {
    planId && setPlanId(planId)
    setListMode(false)
    setBookingsMode(false)
    setSidebarPlanEdit(true)
    setSidebarTableId(0)
    setSidebarGroupId(0)
    setEditMode(true)
  }

  const onGroupEdit = (groupId: number) => {
    setSidebarGroupId(groupId)
    setSidebarTableId(0)
    setEditMode(true)
    setSidebarPlanEdit(false)
  }

  const handleMyBookings = () => {
    setBookingsMode(true)
  }

  const sendTitle = (title: string | undefined) => {
    setSidebarTitle(title)
  }

  useEffect(() => {
    workingDate && localStorage.setItem(WORKING_DATE, workingDate.toString())
  }, [workingDate])

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      {bookingsMode && (
        <MyBookings workingDate={workingDate} setSidebarTableId={setSidebarTableId} />
      )}
      {listMode && !bookingsMode && (
        <Lists
          handlePlaceClick={handlePlaceClick}
          listView={false}
          planId={planId}
          sidebarTableId={sidebarTableId}
          workingDate={workingDate}
        />
      )}
      {!listMode && !bookingsMode && (
        <PlanTransformWrapper
          handlePlaceClick={handlePlaceClick}
          planId={planId}
          sidebarPlanEdit={sidebarPlanEdit}
          sidebarTableId={sidebarTableId}
          workingDate={workingDate}
        />
      )}
      <MenuBar
        handleMyBookings={handleMyBookings}
        handleViewChange={() => setListMode(!listMode)}
        listMode={listMode}
        onDateChange={(value) => setWorkingDate(value)}
        onPlanChange={handlePlanIdChange}
        onPlanEdit={onPlanEdit}
        onGroupEdit={onGroupEdit}
        planId={planId}
        workingDate={workingDate}
        handlePlaceAdd={(id) => {
          handlePlaceClick(id)
          setEditMode(true)
        }}
        handleGroupAdd={handleGroupAdd}
      />
      <Sidebar
        editMode={editMode}
        handleEditMode={() => setEditMode(!editMode)}
        isOpen={sidebarOpen}
        sidebarTitle={sidebarTitle}
        closeSidebar={closeSidebar}
      >
        {sidebarGroupId > 0 && (
          <GroupDetail
            editMode={editMode}
            groupId={sidebarGroupId}
            planId={planId}
            sendTitle={(title) => sendTitle(title)}
          />
        )}
        {sidebarTableId > 0 && (
          <SpaceDetail
            editMode={editMode}
            sendTitle={(title) => sendTitle(title)}
            tableId={sidebarTableId}
            workingDate={workingDate?.toString()}
            planId={planId}
            handleDelete={() => setSidebarTableId(0)}
          />
        )}
        {userCanEdit && sidebarPlanEdit && editMode && (
          <PlanEditor
            sendTitle={(title) => sendTitle(title)}
            planId={planId}
            handleDelete={() => {
              setSidebarPlanEdit(false)
              setPlanId(0)
            }}
          />
        )}
      </Sidebar>
    </>
  )
}

export type MainPageProps = {} & HTMLAttributes<HTMLDivElement>

export default MainPage
