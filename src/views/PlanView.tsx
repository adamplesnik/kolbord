import { Minus, Plus, RotateCcw } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'
import Button from '../components/Button'
import WorkTable from '../components/furniture/WorkTable'
import GroupMarker from '../components/GroupMarker'
import Plan from '../components/Plan'
import { GroupMarkerRecord } from '../data/GroupMarkerRecord'
import { TableRecord } from '../data/TableRecord'
import Page from '../pages/Page'
import MenuBar from '../partials/MenuBar'
import Sidebar from '../partials/Sidebar'

const PlanView = () => {
  const [sidebarTableId, setSidebarTableId] = useState(-1)

  const [tables, setTables] = useState<TableRecord[]>()
  const [markers, setMarkers] = useState<GroupMarkerRecord[]>()

  const fetchTables = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/tables?populate=*`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_PRIVATE_READ_ONLY_API_ID}`,
        },
      })
      const data = await response.json()
      setTables(data.data)
    } catch (error) {
      console.error(error)
    } finally {
    }
  }

  const fetchGroupMarkers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/group-markers?populate[group][fields][0]=name&fields[0]=x&fields[1]=y`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_PRIVATE_READ_ONLY_API_ID}`,
          },
        }
      )
      const data = await response.json()
      setMarkers(data.data)
    } catch (error) {
      console.error(error)
    } finally {
    }
  }

  useEffect(() => {
    fetchTables()
    fetchGroupMarkers()
  }, [])

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
          <RotateCcw />
        </Button>
        <Button>{tables?.length}</Button>
        {sidebarTableId}
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
              {markers?.map((m, i) => (
                <GroupMarker
                  key={`group${i}`}
                  groupName={m.attributes.group.data.attributes.name}
                  x={m.attributes.x}
                  y={m.attributes.y}
                />
              ))}
              {tables?.map((t) => (
                <WorkTable
                  key={t.id}
                  name={t.attributes.name}
                  group={t.attributes.group}
                  rotation={t.attributes.rotation}
                  x={t.attributes.x}
                  y={t.attributes.y}
                  available={t.attributes.available}
                  features={t.attributes.features}
                  active={t.id === sidebarTableId}
                  width={t.attributes.width}
                  height={t.attributes.height}
                  rounded={t.attributes.rounded}
                  onClick={() => {
                    setSidebarTableId(t.id === sidebarTableId ? -1 : t.id)
                  }}
                />
              ))}
              <Plan id={1} />
            </div>
          </TransformComponent>
        </>
      </TransformWrapper>
      <Sidebar
        className={sidebarTableId > -1 ? 'block' : 'hidden'}
        tableId={sidebarTableId}
        closeSidebar={() => setSidebarTableId(-1)}
      />
    </Page>
  )
}

export type PlanViewProps = {} & HTMLAttributes<HTMLDivElement>

export default PlanView
