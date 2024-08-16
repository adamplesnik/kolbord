import { useQuery } from '@tanstack/react-query'
import { CheckCheck, Fullscreen, LogOut, Pencil, Plus, ZoomIn, ZoomOut } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'
import Button from '../components/Button'
import WorkTable from '../components/furniture/WorkTable'
import GroupMarker from '../components/GroupMarker'
import Plan from '../components/Plan'
import Sidebar from '../components/Sidebar'
import { GroupMarkerRecord } from '../data/GroupMarkerRecord'
import Page from '../pages/Page'
import MenuBar from '../partials/MenuBar'
import TableDetail from '../partials/TableDetail'
import { loadBookings, loadTables } from '../utils/fetchApi'
import { useAuthContext } from '../auth/AuthContext'

const PlanView = () => {
  const { user, logout } = useAuthContext()

  const getEditMode = () => localStorage.getItem('plannerEditMode') === 'true'

  const [sidebarTableId, setSidebarTableId] = useState(0)
  const [sidebarMarkerId, setSidebarMarkerId] = useState(0)
  const [editMode, setEditMode] = useState(getEditMode)

  useEffect(() => {
    localStorage.setItem('plannerEditMode', editMode.toString())
  }, [editMode])

  const { data: tables } = useQuery({
    queryKey: ['tables'],
    queryFn: loadTables,
  })

  const { data: bookings } = useQuery({
    queryKey: ['bookings'],
    queryFn: loadBookings,
  })

  type GroupMarkerQueryType = {
    data: GroupMarkerRecord[]
  }

  const loadMarkers = async (): Promise<GroupMarkerQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/group-markers?populate[group][fields][0]=name&populate[group][fields][1]=description&fields[0]=x&fields[1]=y`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PRIVATE_READ_ONLY_API_ID}`,
        },
      }
    )
    return response.json()
  }

  const { data: markers } = useQuery({
    queryKey: ['markers'],
    queryFn: loadMarkers,
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
              {markers?.data.map((m, i) => (
                <GroupMarker
                  key={`group${i}`}
                  groupName={m.attributes.group.data.attributes.name}
                  groupDescription={m.attributes.group.data.attributes.description}
                  x={m.attributes.x}
                  y={m.attributes.y}
                  onClick={() => setSidebarMarkerId(m.id)}
                />
              ))}
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
              <Plan id={1} />
            </div>
          </TransformComponent>
        </>
      </TransformWrapper>
      <Sidebar isOpen={sidebarTableId > 0} closeSidebar={() => setSidebarTableId(0)}>
        <TableDetail tableId={sidebarTableId} bookings={bookings?.data} editMode={editMode} />
      </Sidebar>
      <Sidebar isOpen={sidebarMarkerId > 0} closeSidebar={() => setSidebarMarkerId(0)}>
        mamm
      </Sidebar>
    </Page>
  )
}

export type PlanViewProps = {} & HTMLAttributes<HTMLDivElement>

export default PlanView
