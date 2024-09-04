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
import PlanEditor from '../components/plan/PlanEditor'
import PlanSwitcher from '../components/plan/PlanSwitcher'
import UserMenu from '../components/user/UserMenu'
import MenuBar from '../partials/MenuBar'
import Page from '../partials/Page'
import Sidebar from '../partials/Sidebar'
import { LATEST_PLAN_ID, WORKING_DATE } from '../utils/constants'

const PlanPage = () => {
  const { user, userCanEdit } = useAuthContext()

  const getLocalWorkingDate = localStorage.getItem(WORKING_DATE)

  const [sidebarTableId, setSidebarTableId] = useState(0)
  const [sidebarTitle, setSidebarTitle] = useState<string | undefined>(undefined)
  const [sidebarMarkerId, setSidebarMarkerId] = useState(0)
  const [sidebarPlanEdit, setSidebarPlanEdit] = useState(false)
  const [planId, setPlanId] = useState(0)
  const [workingDate, setWorkingDate] = useState<Value>(
    getLocalWorkingDate && new Date(getLocalWorkingDate.toString()) >= new Date()
      ? new Date(getLocalWorkingDate.toString())
      : new Date()
  )

  useEffect(() => {
    setSidebarTitle(sidebarTitle)
  }, [sidebarTitle])

  useEffect(() => {
    setPlanId(planId)
  }, [planId])

  type ValuePiece = Date | null
  type Value = ValuePiece | [ValuePiece, ValuePiece]

  const handlePlanIdChange = (id: number | undefined) => {
    if (id) {
      setPlanId(id)
      setSidebarMarkerId(0)
      setSidebarTableId(0)
      localStorage.setItem(LATEST_PLAN_ID, id.toString())
    }
  }

  const handleMarkerClick = (id: number) => {
    setSidebarMarkerId(id)
    setSidebarTableId(0)
  }

  const handlePlaceClick = (id: number) => {
    setSidebarMarkerId(0)
    setSidebarTableId(id)
    setSidebarPlanEdit(false)
  }

  const onPlanEdit = (planId: number | undefined) => {
    planId && setPlanId(planId)
    setSidebarPlanEdit(true)
    setSidebarTableId(0)
  }

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
        <UserMenu />
        <div className="flex rounded bg-slate-200/70 p-0.5">
          {user && !user.error && (
            <>
              <PlanDateSelector
                onChange={(value) => setWorkingDate(value)}
                workingDate={workingDate}
              />
              <PlanSwitcher
                onPlanEdit={onPlanEdit}
                currentPlan={planId}
                companyId={user.company.id}
                onPlanChange={handlePlanIdChange}
                handlePlaceAdd={handlePlaceClick}
              />
            </>
          )}
        </div>
      </MenuBar>
    )
  }

  if (!user || user.error) {
    return <Navigate to="/" />
  }

  if (user && user.onboardingCompanyName) {
    return <Navigate to="/onboarding" />
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
          <TransformComponent wrapperClass="!h-screen !w-full">
            <div className="relative m-8">
              <GroupMarkers onMarkerClick={handleMarkerClick} planId={planId} />
              <Places
                sidebarTableId={sidebarTableId}
                handlePlaceClick={handlePlaceClick}
                planId={planId}
              />
              {planId > 0 && <Plan planId={planId} />}
            </div>
          </TransformComponent>
        </>
      </TransformWrapper>
      <Sidebar
        isOpen={sidebarTableId > 0 || sidebarPlanEdit}
        sidebarTitle={sidebarTitle}
        closeSidebar={() => {
          setSidebarTableId(0)
          setSidebarPlanEdit(false)
        }}
      >
        {sidebarTableId > 0 && (
          <PlaceDetail
            sendTitle={(title) => setSidebarTitle(title)}
            tableId={sidebarTableId}
            workingDate={workingDate?.toString()}
            planId={planId}
            handleDelete={() => setSidebarTableId(0)}
          />
        )}
        {userCanEdit && sidebarPlanEdit && (
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
      <Sidebar
        isOpen={sidebarMarkerId > 0}
        closeSidebar={() => setSidebarMarkerId(0)}
        sidebarTitle={sidebarTitle}
      >
        mamm
      </Sidebar>
    </Page>
  )
}

export type PlanPageProps = {} & HTMLAttributes<HTMLDivElement>

export default PlanPage
