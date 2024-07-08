import { Minus, Plus, RotateCcw } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'
import Button from '../components/Button'
import Svg from '../components/Svg'
import WorkTable from '../components/furniture/WorkTable'
import { TableRecord } from '../data/TableRecord'
import Page from '../pages/Page'
import MenuBar from '../partials/MenuBar'
import Sidebar from '../partials/Sidebar'
import plan from '/plan.svg'

const PlanView = () => {
  const [sidebarTableId, setSidebarTableId] = useState(-1)

  const [tables, setTables] = useState<TableRecord[]>()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/tables?populate=*`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_PRIVATE_READ_ONLY_API_ID}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTables(data.data))
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
        initialScale={0.4}
        centerOnInit={true}
        minScale={0.2}
        maxScale={1}
      >
        <>
          <Controls />
          <TransformComponent wrapperClass="!h-screen">
            <div className="relative m-8">
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
              <Svg className={'max-w-fit bg-white'} source={plan} />
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
