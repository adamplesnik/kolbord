import { useQuery } from '@tanstack/react-query'
import { CheckCheck, Fullscreen, Minus, Pencil, Plus } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'
import Button from '../components/Button'
import WorkTable from '../components/furniture/WorkTable'
import Plan from '../components/Plan'
import Page from '../pages/Page'
import GroupMarkers from '../partials/GroupMarkers'
import MenuBar from '../partials/MenuBar'
import { loadBookings, loadTables } from '../utils/fetchApi'
import Sidebar from '../components/Sidebar'
import TableDetail from '../partials/TableDetail'

const PlanView = () => {
  const getEditMode = () => localStorage.getItem('plannerEditMode') === 'true'

  const [sidebarTableId, setSidebarTableId] = useState(0)
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

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls()

    return (
      <MenuBar>
        <Button onClick={() => zoomIn()}>
          <Plus />
        </Button>
        <Button onClick={() => zoomOut()}>
          <Minus />
        </Button>
        <Button onClick={() => resetTransform()}>
          <Fullscreen />
        </Button>
        <Button onClick={() => setEditMode(!editMode)}>
          {editMode ? <CheckCheck /> : <Pencil />}
        </Button>
        <Button>{tables?.data.length}</Button>
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
              <GroupMarkers />
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
    </Page>
  )
}

export type PlanViewProps = {} & HTMLAttributes<HTMLDivElement>

export default PlanView
