import { HTMLAttributes, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../auth/AuthContext'
import Lists from '../components/list/Lists'
import PlanEditor from '../components/plan/PlanEditor'
import PlanTransformWrapper from '../components/plan/PlanTransformWrapper'
import SpaceDetail from '../components/space/SpaceDetail.tsx'
import MyBookings from '../components/user/MyBookings.tsx'
import MenuBar from '../partials/MenuBar'
import Sidebar from '../partials/Sidebar'
import { LATEST_PLAN_ID, WORKING_DATE } from '../utils/constants'

const MainPage = () => {
  const { user, userCanEdit } = useAuthContext()

  const getLocalWorkingDate = localStorage.getItem(WORKING_DATE)

  const [sidebarTableId, setSidebarTableId] = useState(0)
  const [sidebarTitle, setSidebarTitle] = useState<string | undefined>(undefined)
  const [sidebarPlanEdit, setSidebarPlanEdit] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [planId, setPlanId] = useState(0)
  const [listView, setListView] = useState(false)
  const [workingDate, setWorkingDate] = useState<Value>(
    getLocalWorkingDate && new Date(getLocalWorkingDate.toString()) >= new Date() ?
      new Date(getLocalWorkingDate.toString())
    : new Date()
  )

  useEffect(() => {
    setSidebarTitle(sidebarTitle)
  }, [sidebarTitle])

  useEffect(() => {
    setWorkingDate(workingDate)
  }, [workingDate])

  useEffect(() => {
    setPlanId(planId)
  }, [planId])

  type ValuePiece = Date | null
  type Value = ValuePiece | [ValuePiece, ValuePiece]

  const handlePlanIdChange = (id: number | undefined) => {
    if (id) {
      setPlanId(id)
      setSidebarTableId(0)
      localStorage.setItem(LATEST_PLAN_ID, id.toString())
    }
  }

  const handlePlaceClick = (id: number) => {
    setSidebarTableId(id)
    setSidebarPlanEdit(false)
  }

  const onPlanEdit = (planId: number | undefined) => {
    planId && setPlanId(planId)
    setListView(false)
    setSidebarPlanEdit(true)
    setSidebarTableId(0)
    setEditMode(true)
  }

  useEffect(() => {
    workingDate && localStorage.setItem(WORKING_DATE, workingDate.toString())
  }, [workingDate])

  if (!user || user.error) {
    return <Navigate to="/" />
  }

  if (user && user.onboardingCompanyName) {
    return <Navigate to="/onboarding" />
  }

  return (
    <>
      <MyBookings workingDate={workingDate} />
      {listView ?
        <Lists
          handlePlaceClick={handlePlaceClick}
          listView={false}
          planId={planId}
          sidebarTableId={sidebarTableId}
          workingDate={workingDate}
        />
      : <PlanTransformWrapper
          handlePlaceClick={handlePlaceClick}
          listView={listView}
          planId={planId}
          sidebarPlanEdit={sidebarPlanEdit}
          sidebarTableId={sidebarTableId}
          workingDate={workingDate}
        />
      }
      <MenuBar
        onPlanChange={handlePlanIdChange}
        onPlanEdit={onPlanEdit}
        workingDate={workingDate}
        onListChange={() => setListView(!listView)}
        onDateChange={(value) => setWorkingDate(value)}
        planId={planId}
        listView={listView}
        handlePlaceAdd={(id) => {
          handlePlaceClick(id)
          setEditMode(true)
        }}
      />
      <Sidebar
        editMode={editMode}
        handleEditMode={() => setEditMode(!editMode)}
        isOpen={sidebarTableId > 0 || (sidebarPlanEdit && editMode)}
        sidebarTitle={sidebarTitle}
        closeSidebar={() => {
          setSidebarTableId(0)
          setSidebarPlanEdit(false)
          setEditMode(false)
        }}
      >
        {sidebarTableId > 0 && (
          <SpaceDetail
            editMode={editMode}
            sendTitle={(title) => setSidebarTitle(title)}
            tableId={sidebarTableId}
            workingDate={workingDate?.toString()}
            planId={planId}
            handleDelete={() => setSidebarTableId(0)}
          />
        )}
        {userCanEdit && sidebarPlanEdit && editMode && (
          <PlanEditor
            sendTitle={(title) => setSidebarTitle(title)}
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
