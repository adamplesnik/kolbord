import { RedirectToSignIn, SignedOut } from '@clerk/clerk-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import GroupDetail from '../components/group/GroupDetail.tsx'
import Lists from '../components/list/Lists'
import { Value } from '../components/plan/PlanDateSelector.tsx'
import PlanEditor from '../components/plan/PlanEditor'
import PlanTransformWrapper from '../components/plan/PlanTransformWrapper'
import SpaceDetail from '../components/space/SpaceDetail.tsx'
import { SpaceType } from '../components/space/spaceType'
import MenuBar from '../partials/MenuBar'
import Sidebar from '../partials/Sidebar'
import { LATEST_PLAN_ID, WORKING_DATE } from '../utils/constants'

const MainPage = () => {
  const userCanEdit = true

  const getLocalWorkingDate = localStorage.getItem(WORKING_DATE)

  const [bookingsMode, setBookingsMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [listMode, setListMode] = useState(false)
  const [zoneId, setZoneId] = useState(0)
  const [sidebarGroupId, setSidebarGroupId] = useState(0)
  const [sidebarPlanEdit, setSidebarPlanEdit] = useState(false)
  const [sidebarSpace, setSidebarSpace] = useState<SpaceType | undefined>(undefined)
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
    setZoneId(zoneId)
  }, [zoneId])

  useEffect(() => {
    setBookingsMode(bookingsMode)
  }, [bookingsMode])

  const sidebarOpen =
    sidebarSpace != undefined || (sidebarPlanEdit && editMode) || (sidebarGroupId > 0 && editMode)

  const closeSidebar = () => {
    setEditMode(false)
    setSidebarGroupId(0)
    setSidebarPlanEdit(false)
    setSidebarSpace(undefined)
  }

  const handlePlanIdChange = (id: number | undefined) => {
    if (id) {
      setZoneId(id)
      setSidebarSpace(undefined)
      setSidebarGroupId(0)
      setBookingsMode(false)
      localStorage.setItem(LATEST_PLAN_ID, id.toString())
    }
  }

  const handleGroupAdd = () => {
    setSidebarSpace(undefined)
  }

  const handlePlaceClick = (space: SpaceType) => {
    setSidebarSpace(space)
    setSidebarGroupId(0)
    setSidebarPlanEdit(false)
  }

  const onPlanEdit = (zoneId: number | undefined) => {
    zoneId && setZoneId(zoneId)
    setListMode(false)
    setBookingsMode(false)
    setSidebarPlanEdit(true)
    setSidebarSpace(undefined)
    setSidebarGroupId(0)
    setEditMode(true)
  }

  const onGroupEdit = (groupId: number) => {
    setSidebarGroupId(groupId)
    setSidebarSpace(undefined)
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
      {/* {bookingsMode && (
        <MyBookings workingDate={workingDate} setSidebarTableId={setSidebarTableId} />
      )} */}
      {listMode && !bookingsMode && (
        <Lists
          handlePlaceClick={handlePlaceClick}
          listView={false}
          sidebarSpace={sidebarSpace}
          workingDate={workingDate}
        />
      )}
      {!listMode && !bookingsMode && (
        <PlanTransformWrapper
          handlePlaceClick={handlePlaceClick}
          zoneId={zoneId}
          sidebarPlanEdit={sidebarPlanEdit}
          sidebarSpace={sidebarSpace}
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
        workingDate={workingDate}
        handlePlaceAdd={(space) => {
          handlePlaceClick(space)
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
            sendTitle={(title) => sendTitle(title)}
          />
        )}
        {sidebarSpace && (
          <SpaceDetail
            editMode={editMode}
            sendTitle={(title) => sendTitle(title)}
            space={sidebarSpace}
            workingDate={workingDate?.toString()}
            handleDelete={() => setSidebarSpace(undefined)}
          />
        )}
        {userCanEdit && sidebarPlanEdit && editMode && (
          <PlanEditor
            sendTitle={(title) => sendTitle(title)}
            handleDelete={() => {
              setSidebarPlanEdit(false)
              setZoneId(0)
            }}
          />
        )}
      </Sidebar>
    </>
  )
}

export type MainPageProps = HTMLAttributes<HTMLDivElement>

export default MainPage
