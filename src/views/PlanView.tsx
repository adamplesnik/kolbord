import { useQuery } from '@tanstack/react-query'
import { CheckCheck, Fullscreen, LogOut, Pencil, ZoomIn, ZoomOut } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'
import { useAuthContext } from '../auth/AuthContext'
import Button from '../components/Button'
import GroupMarkers from '../components/group-marker/GroupMarkers'
import Place from '../components/place/Place'
import PlaceAdd from '../components/place/PlaceAdd'
import PlaceDetail from '../components/place/PlaceDetail'
import Plan from '../components/plan/Plan'
import PlanSwitcher from '../components/plan/PlanSwitcher'
import Sidebar from '../components/Sidebar'
import Page from '../pages/Page'
import MenuBar from '../partials/MenuBar'
import { EDIT_MODE, LATEST_PLAN_ID } from '../utils/constants'
import { loadTables } from '../utils/fetchApi'

const PlanView = () => {
  const { user, logout } = useAuthContext()

  const getEditMode = () => localStorage.getItem(EDIT_MODE) === 'true'

  const [sidebarTableId, setSidebarTableId] = useState(0)
  const [sidebarMarkerId, setSidebarMarkerId] = useState(0)
  const [editMode, setEditMode] = useState(getEditMode)
  const [planId, setPlanId] = useState(0)

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

  const { data: tables } = useQuery({
    queryKey: ['tables', planId],
    queryFn: () => loadTables(planId),
  })

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls()

    return (
      <MenuBar>
        <div className="flex">
          <Button onClick={() => zoomIn()}>
            <ZoomIn />
          </Button>
          <Button onClick={() => zoomOut()}>
            <ZoomOut />
          </Button>
          <Button onClick={() => resetTransform()}>
            <Fullscreen />
          </Button>
        </div>
        <div className={'flex rounded p-px' + (editMode && ' bg-pink-300')}>
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? <CheckCheck /> : <Pencil />}
          </Button>
          {editMode && <PlaceAdd planId={planId} handlePlaceAdd={handlePlaceAdd} />}
        </div>
        <div>{user?.name + ' ' + user?.surname}</div>
        {user?.companies.map((company) => (
          <PlanSwitcher
            currentPlan={planId}
            companyId={company.uuid}
            key={company.uuid}
            onPlanChange={handlePlanIdChange}
          />
        ))}
        {user && (
          <Button onClick={() => logout()}>
            <LogOut />
          </Button>
        )}
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
              {tables?.data.map((t) => (
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
        <PlaceDetail tableId={sidebarTableId} editMode={editMode} />
      </Sidebar>
      <Sidebar isOpen={editMode && sidebarMarkerId > 0} closeSidebar={() => setSidebarMarkerId(0)}>
        mamm
      </Sidebar>
    </Page>
  )
}

export type PlanViewProps = {} & HTMLAttributes<HTMLDivElement>

export default PlanView
