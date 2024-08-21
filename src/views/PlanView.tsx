import { useQuery } from '@tanstack/react-query'
import { CheckCheck, Fullscreen, LogOut, Pencil, Plus, ZoomIn, ZoomOut } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'
import { useAuthContext } from '../auth/AuthContext'
import Button from '../components/Button'
import WorkTable from '../components/furniture/WorkTable'
import Plan from '../components/Plan'
import PlanSwitcher from '../components/PlanSwitcher'
import Sidebar from '../components/Sidebar'
import Page from '../pages/Page'
import GroupMarkers from '../partials/GroupMarkers'
import MenuBar from '../partials/MenuBar'
import TableDetail from '../partials/TableDetail'
import { loadBookings, loadTables } from '../utils/fetchApi'

const PlanView = () => {
  const { user, logout } = useAuthContext()

  const getEditMode = () => localStorage.getItem('plannerEditMode') === 'true'

  const [sidebarTableId, setSidebarTableId] = useState(0)
  const [sidebarMarkerId, setSidebarMarkerId] = useState(0)
  const [editMode, setEditMode] = useState(getEditMode)
  const [planUuid, setPlanUuid] = useState('')

  const handlePlanUuidChange = (uuid: string) => {
    setPlanUuid(uuid)
  }

  const handleMarkerClick = (id: number) => {
    setSidebarMarkerId(id)
  }

  useEffect(() => {
    localStorage.setItem('plannerEditMode', editMode.toString())
  }, [editMode])

  const { data: tables } = useQuery({
    queryKey: ['tables', planUuid],
    queryFn: () => loadTables(planUuid),
  })

  const { data: bookings } = useQuery({
    queryKey: ['bookings'],
    queryFn: loadBookings,
  })

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls()

    return (
      <MenuBar>
        <div className="flex p-1">
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
        <div className={'flex rounded p-1' + (editMode && ' bg-pink-300')}>
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? <CheckCheck /> : <Pencil />}
          </Button>
          {editMode && (
            <Button>
              <Plus />
            </Button>
          )}
        </div>
        <div>{user?.name + ' ' + user?.surname}</div>
        {user?.companies.map((company) => (
          <PlanSwitcher
            companyId={company.uuid}
            key={company.uuid}
            onPlanChange={handlePlanUuidChange}
          />
        ))}
        <span className="max-w-20 text-wrap text-xs">{planUuid}</span>
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
              <GroupMarkers onMarkerClick={handleMarkerClick} planUuid={planUuid} />
              {tables?.data.map((t) => (
                <WorkTable
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
                  }}
                  active={t.id === sidebarTableId}
                  onClick={() => {
                    setSidebarTableId(t.id)
                  }}
                />
              ))}
              {planUuid != '' && <Plan uuid={planUuid} />}
            </div>
          </TransformComponent>
        </>
      </TransformWrapper>
      <Sidebar isOpen={sidebarTableId > 0} closeSidebar={() => setSidebarTableId(0)}>
        <TableDetail tableId={sidebarTableId} bookings={bookings?.data} editMode={editMode} />
      </Sidebar>
      <Sidebar isOpen={editMode && sidebarMarkerId > 0} closeSidebar={() => setSidebarMarkerId(0)}>
        mamm
      </Sidebar>
    </Page>
  )
}

export type PlanViewProps = {} & HTMLAttributes<HTMLDivElement>

export default PlanView
