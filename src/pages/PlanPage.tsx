import { HTMLAttributes, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'
import { useAuthContext } from '../auth/AuthContext'
import GroupMarkers from '../components/group-marker/GroupMarkers'
import PlaceDetail from '../components/place/PlaceDetail'
import Places from '../components/place/Places'
import Plan from '../components/plan/Plan'
import PlanControls from '../components/plan/PlanControls'
import PlanDateSelector from '../components/plan/PlanDateSelector'
import PlanEdit from '../components/plan/PlanEdit'
import PlanSwitcher from '../components/plan/PlanSwitcher'
import UserMenu from '../components/user/UserMenu'
import MenuBar from '../partials/MenuBar'
import Page from '../partials/Page'
import Sidebar from '../partials/Sidebar'
import { EDIT_MODE, LATEST_PLAN_ID, WORKING_DATE } from '../utils/constants'

const PlanPage = () => {
  const { user } = useAuthContext()

  const getEditMode = () => localStorage.getItem(EDIT_MODE) === 'true'
  const getLocalWorkingDate = localStorage.getItem(WORKING_DATE)

  const [sidebarTableId, setSidebarTableId] = useState(0)
  const [sidebarMarkerId, setSidebarMarkerId] = useState(0)
  const [editMode, setEditMode] = useState(getEditMode)
  const [planId, setPlanId] = useState(0)
  const [workingDate, setWorkingDate] = useState<Value>(
    getLocalWorkingDate && new Date(getLocalWorkingDate.toString()) >= new Date()
      ? new Date(getLocalWorkingDate.toString())
      : new Date()
  )

  type ValuePiece = Date | null
  type Value = ValuePiece | [ValuePiece, ValuePiece]

  const handleEditModeChange = () => {
    setEditMode(!editMode)
  }

  const handlePlanIdChange = (id: number) => {
    setPlanId(id)
    setSidebarMarkerId(0)
    setSidebarTableId(0)
    localStorage.setItem(LATEST_PLAN_ID, id.toString())
  }

  const handleMarkerClick = (id: number) => {
    setSidebarMarkerId(id)
    setSidebarTableId(0)
  }

  const handlePlaceClick = (id: number) => {
    setSidebarMarkerId(0)
    setSidebarTableId(id)
  }

  useEffect(() => {
    localStorage.setItem(EDIT_MODE, editMode.toString())
  }, [editMode])

  useEffect(() => {
    workingDate && localStorage.setItem(WORKING_DATE, workingDate.toString())
  }, [workingDate])

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls()

    return (
      <MenuBar>
        <PlanControls
          zoomIn={() => zoomIn()}
          zoomOut={() => zoomOut()}
          resetTransform={() => resetTransform()}
        />
        <PlanEdit
          planId={planId}
          handlePlaceAdd={handlePlaceClick}
          handleEditModeChange={handleEditModeChange}
          editMode={editMode}
        />
        <UserMenu />
        <div className="flex rounded bg-slate-200/70 p-0.5">
          {user && (
            <>
              <PlanDateSelector
                onChange={(value) => setWorkingDate(value)}
                workingDate={workingDate}
              />
              <PlanSwitcher
                currentPlan={planId}
                companyId={user.company.uuid}
                key={user.company.uuid}
                onPlanChange={handlePlanIdChange}
              />
            </>
          )}
        </div>
      </MenuBar>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <Page>
      <TransformWrapper
        pinch={{ disabled: false }}
        panning={{ wheelPanning: true, disabled: false, allowLeftClickPan: true }}
        initialScale={0.6}
        centerOnInit={true}
        minScale={0.2}
        maxScale={1}
      >
        <>
          <Controls />
          <TransformComponent wrapperClass="!h-screen">
            <div className="relative m-8">
              <GroupMarkers onMarkerClick={handleMarkerClick} planId={planId} editMode={editMode} />
              <Places
                editMode={editMode}
                sidebarTableId={sidebarTableId}
                handlePlaceClick={handlePlaceClick}
                planId={planId}
              />
              {planId > 0 && <Plan id={planId} />}
            </div>
          </TransformComponent>
        </>
      </TransformWrapper>
      <Sidebar
        isOpen={sidebarTableId > 0}
        closeSidebar={() => setSidebarTableId(0)}
        handleEditMode={() => setEditMode(!editMode)}
        handlePlaceAdd={handlePlaceClick}
        editMode={editMode}
        planId={planId}
      >
        <PlaceDetail
          tableId={sidebarTableId}
          editMode={editMode}
          workingDate={workingDate?.toString()}
          planId={planId}
        />
      </Sidebar>
      <Sidebar
        isOpen={editMode && sidebarMarkerId > 0}
        closeSidebar={() => setSidebarMarkerId(0)}
        handleEditMode={() => setEditMode(!editMode)}
        handlePlaceAdd={handlePlaceClick}
        editMode={editMode}
        planId={planId}
      >
        mamm
      </Sidebar>
    </Page>
  )
}

export type PlanPageProps = {} & HTMLAttributes<HTMLDivElement>

export default PlanPage
