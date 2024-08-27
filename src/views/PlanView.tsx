import { useQuery } from '@tanstack/react-query'
import { HTMLAttributes, useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'
import { useAuthContext } from '../auth/AuthContext'
import GroupMarkers from '../components/group-marker/GroupMarkers'
import Place from '../components/place/Place'
import PlaceDetail from '../components/place/PlaceDetail'
import Plan from '../components/plan/Plan'
import PlanControls from '../components/plan/PlanControls'
import PlanDateSelector from '../components/plan/PlanDateSelector'
import PlanEdit from '../components/plan/PlanEdit'
import PlanSwitcher from '../components/plan/PlanSwitcher'
import Sidebar from '../components/Sidebar'
import UserMenu from '../components/user/UserMenu'
import Page from '../pages/Page'
import MenuBar from '../partials/MenuBar'
import { EDIT_MODE, LATEST_PLAN_ID, WORKING_DATE } from '../utils/constants'
import { loadTables } from '../utils/fetchApi'

const PlanView = () => {
  const { user } = useAuthContext()

  const getEditMode = () => localStorage.getItem(EDIT_MODE) === 'true'
  const getWorkingDate = localStorage.getItem(WORKING_DATE)

  const [sidebarTableId, setSidebarTableId] = useState(0)
  const [sidebarMarkerId, setSidebarMarkerId] = useState(0)
  const [editMode, setEditMode] = useState(getEditMode)
  const [planId, setPlanId] = useState(0)

  type ValuePiece = Date | null
  type Value = ValuePiece | [ValuePiece, ValuePiece]
  const [workingDate, setWorkingDate] = useState<Value>(
    getWorkingDate ? new Date(getWorkingDate.toString()) : new Date()
  )

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

  const handlePlaceAdd = (id: number) => {
    setSidebarMarkerId(0)
    setSidebarTableId(id)
  }

  useEffect(() => {
    localStorage.setItem(EDIT_MODE, editMode.toString())
  }, [editMode])

  useEffect(() => {
    workingDate && localStorage.setItem(WORKING_DATE, workingDate.toString())
  }, [workingDate])

  const { data: tables } = useQuery({
    queryKey: ['tables', planId],
    queryFn: () => loadTables(planId),
  })

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
          handlePlaceAdd={handlePlaceAdd}
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
              {user.companies.map((company) => (
                <PlanSwitcher
                  currentPlan={planId}
                  companyId={company.uuid}
                  key={company.uuid}
                  onPlanChange={handlePlanIdChange}
                />
              ))}
            </>
          )}
        </div>
      </MenuBar>
    )
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
              {tables?.data &&
                tables.data.map((t) => (
                  <Place
                    key={t.id}
                    id={t.id}
                    attributes={{
                      name: t.attributes.name,
                      group: t.attributes.group,
                      rotation: t.attributes.rotation,
                      x: t.attributes.x,
                      y: t.attributes.y,
                      available: t.attributes.available,
                      features: t.attributes.features,
                      width: t.attributes.width,
                      height: t.attributes.height,
                      rounded: t.attributes.rounded,
                      chairs: t.attributes.chairs,
                      slots: t.attributes.slots,
                    }}
                    active={t.id === sidebarTableId}
                    onClick={() => {
                      setSidebarTableId(t.id), setSidebarMarkerId(0)
                    }}
                  />
                ))}
              {planId > 0 && <Plan id={planId} />}
            </div>
          </TransformComponent>
        </>
      </TransformWrapper>
      <Sidebar isOpen={sidebarTableId > 0} closeSidebar={() => setSidebarTableId(0)}>
        <PlaceDetail
          tableId={sidebarTableId}
          editMode={editMode}
          workingDate={workingDate?.toString()}
        />
      </Sidebar>
      <Sidebar isOpen={editMode && sidebarMarkerId > 0} closeSidebar={() => setSidebarMarkerId(0)}>
        mamm
      </Sidebar>
    </Page>
  )
}

export type PlanViewProps = {} & HTMLAttributes<HTMLDivElement>

export default PlanView
