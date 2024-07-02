import { Minus, Plus, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'
import Button from './components/Button'
import Svg from './components/Svg'
import WorkTable from './components/furniture/WorkTable'
import tables from './data/tables.json'
import MenuBar from './partials/MenuBar'
import Sidebar from './partials/Sidebar'
import { getTableId } from './utils/getTableId'
import plan from '/plan.svg'

function App() {
  const [sidebarTableId, setSidebarTableId] = useState('')

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
        <Button>{tables.length}</Button>
      </MenuBar>
    )
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden">
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
                {tables.map((t, i) => (
                  <WorkTable
                    key={i}
                    name={t.name}
                    group={t.group}
                    rotation={t.rotation}
                    x={t.x}
                    y={t.y}
                    available={t.available}
                    features={t.features}
                    onClick={(e) => {
                      e.preventDefault()
                      setSidebarTableId(getTableId(t.name, t.group))
                    }}
                  />
                ))}
                <Svg className={'max-w-fit bg-white'} source={plan} />
              </div>
            </TransformComponent>
          </>
        </TransformWrapper>
        <Sidebar
          className={sidebarTableId ? 'block' : 'hidden'}
          tableId={sidebarTableId}
          closeSidebar={() => setSidebarTableId('')}
        />
      </div>
    </>
  )
}

export default App
