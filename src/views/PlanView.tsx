import { useQuery } from '@tanstack/react-query'
import { Minus, Plus, RotateCcw } from 'lucide-react'
import { HTMLAttributes, useState } from 'react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'
import Button from '../components/Button'
import WorkTable from '../components/furniture/WorkTable'
import GroupMarker from '../components/GroupMarker'
import Plan from '../components/Plan'
import Page from '../pages/Page'
import MenuBar from '../partials/MenuBar'
import Sidebar from '../partials/Sidebar'
import { loadMarkers, loadTables } from '../utils/fetchApi'

const PlanView = () => {
  const [sidebarTableId, setSidebarTableId] = useState('')

  const { data: tables } = useQuery({
    queryKey: ['tables'],
    queryFn: loadTables,
  })

  const { data: markers } = useQuery({
    queryKey: ['markers'],
    queryFn: loadMarkers,
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
          <RotateCcw />
        </Button>
        <Button>{tables?.data.length}</Button>
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
              {markers?.data.map((m, i) => (
                <GroupMarker
                  key={`group${i}`}
                  groupName={m.attributes.group.data.attributes.name}
                  x={m.attributes.x}
                  y={m.attributes.y}
                />
              ))}
              {tables?.data.map((t) => (
                <WorkTable
                  key={t.attributes.uuid}
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
                    uuid: t.attributes.uuid,
                  }}
                  active={t.attributes.uuid === sidebarTableId}
                  onClick={() => {
                    setSidebarTableId(t.attributes.uuid === sidebarTableId ? '' : t.attributes.uuid)
                  }}
                />
              ))}
              <Plan id={1} />
            </div>
          </TransformComponent>
        </>
      </TransformWrapper>
      <Sidebar
        className={sidebarTableId != '' ? 'block' : 'hidden'}
        tableId={sidebarTableId}
        closeSidebar={() => setSidebarTableId('')}
      />
    </Page>
  )
}

export type PlanViewProps = {} & HTMLAttributes<HTMLDivElement>

export default PlanView
