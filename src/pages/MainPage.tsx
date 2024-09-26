import { RedirectToSignIn, SignedOut } from '@clerk/clerk-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import GroupDetail from '../components/group/GroupDetail.tsx'
import Lists from '../components/list/Lists'
import { Value } from '../components/plan/PlanDateSelector.tsx'
import PlanDelete from '../components/plan/PlanDelete.tsx'
import PlanEditor from '../components/plan/PlanEditor'
import PlanTransformWrapper from '../components/plan/PlanTransformWrapper'
import SpaceDelete from '../components/space/SpaceDelete.tsx'
import SpaceDetail from '../components/space/SpaceDetail.tsx'
import SpaceEdit from '../components/space/SpaceEdit.tsx'
import { SpaceType } from '../components/space/spaceType'
import MyBookings from '../components/user/MyBookings.tsx'
import { GroupRecord } from '../data/GroupRecord.tsx'
import MenuBar from '../partials/MenuBar'
import Sidebar from '../partials/Sidebar'
import { WORKING_DATE } from '../utils/constants'

const MainPage = () => {
  const userCanEdit = true

  const getLocalWorkingDate = localStorage.getItem(WORKING_DATE)

  const [bookingsMode, setBookingsMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [listMode, setListMode] = useState(false)
  const [sidebarGroup, setSidebarGroup] = useState<GroupRecord | undefined>(undefined)
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
    setBookingsMode(bookingsMode)
  }, [bookingsMode])

  const sidebarOpen =
    sidebarSpace != undefined ||
    (sidebarPlanEdit && editMode) ||
    (sidebarGroup != undefined && editMode)

  const closeSidebar = () => {
    setEditMode(false)
    setSidebarGroup(undefined)
    setSidebarPlanEdit(false)
    setSidebarSpace(undefined)
  }

  const handlePlanIdChange = (id: number | undefined) => {
    if (id) {
      setSidebarSpace(undefined)
      setSidebarGroup(undefined)
      setBookingsMode(false)
    }
  }

  const handlePlaceClick = (space: SpaceType) => {
    setSidebarSpace(space)
    setSidebarGroup(undefined)
    setSidebarPlanEdit(false)
  }

  const onPlanEdit = () => {
    setListMode(false)
    setBookingsMode(false)
    setSidebarPlanEdit(true)
    setSidebarSpace(undefined)
    setSidebarGroup(undefined)
    setEditMode(true)
  }

  const onGroupEdit = (group: GroupRecord) => {
    setSidebarGroup(group)
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
      {bookingsMode && <MyBookings workingDate={workingDate} />}
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
      />
      <Sidebar
        editMode={editMode}
        handleEditMode={() => setEditMode(!editMode)}
        isOpen={sidebarOpen}
        sidebarTitle={sidebarTitle}
        closeSidebar={closeSidebar}
      >
        {sidebarGroup != undefined && (
          <GroupDetail
            editMode={editMode}
            group={sidebarGroup}
            sendTitle={(title) => sendTitle(title)}
          />
        )}
        {sidebarSpace && !editMode && (
          <SpaceDetail
            sendTitle={(title) => sendTitle(title)}
            space={sidebarSpace}
            workingDate={workingDate?.toString()}
          />
        )}
        {sidebarSpace && editMode && (
          <>
            <SpaceEdit
              space={sidebarSpace}
              sendTitle={(title) => sendTitle(title)}
              handleEdit={(space) => setSidebarSpace(space)}
            />
            <SpaceDelete id={sidebarSpace.id} handleDelete={() => setSidebarSpace(undefined)} />
          </>
        )}
        {userCanEdit && sidebarPlanEdit && editMode && (
          <>
            <PlanEditor sendTitle={(title) => sendTitle(title)} />
            <PlanDelete
              handleDelete={() => {
                setSidebarPlanEdit(false)
              }}
            />
          </>
        )}
      </Sidebar>
    </>
  )
}

export type MainPageProps = HTMLAttributes<HTMLDivElement>

export default MainPage
