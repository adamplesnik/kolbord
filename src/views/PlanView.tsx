import { useQuery } from '@tanstack/react-query'
import { Minus, Plus, RotateCcw } from 'lucide-react'
import { HTMLAttributes, useState } from 'react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'
import Button from '../components/Button'
import WorkTable from '../components/furniture/WorkTable'
import Plan from '../components/Plan'
import Page from '../pages/Page'
import GroupMarkers from '../partials/GroupMarkers'
import MenuBar from '../partials/MenuBar'
import Sidebar from '../partials/Sidebar'
import { loadTables } from '../utils/fetchApi'
import { TableRecord } from '../data/TableRecord'

const PlanView = () => {
  const [sidebarTable, setSidebarTable] = useState<TableRecord>()

  const { data: tables } = useQuery({
    queryKey: ['tables'],
    queryFn: loadTables,
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
        {sidebarTable?.attributes.uuid}
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
                  active={t === sidebarTable}
                  onClick={() => {
                    setSidebarTable(
                      t.attributes.uuid === sidebarTable?.attributes.uuid ? undefined : t
                    )
                  }}
                />
              ))}
              <Plan id={1} />
            </div>
          </TransformComponent>
        </>
      </TransformWrapper>
      <Sidebar
        className={sidebarTable != undefined ? 'block' : 'hidden'}
        table={sidebarTable}
        closeSidebar={() => setSidebarTable(undefined)}
      />
    </Page>
  )
}

export type PlanViewProps = {} & HTMLAttributes<HTMLDivElement>

export default PlanView
