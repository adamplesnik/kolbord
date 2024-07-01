import { Maximize2, Minimize2 } from 'lucide-react'
import { useState } from 'react'
import { useImageSize } from 'react-image-size'
import Button from './components/Button'
import Svg from './components/Svg'
import WorkTable from './components/furniture/WorkTable'
import { tables } from './data/tables'
import MenuBar from './partials/MenuBar'
import Sidebar from './partials/Sidebar'
import { getTableId } from './utils/getTableId'
import plan from '/plan.svg'

function App() {
  const [fit, setFit] = useState(false)
  const [sidebarTableId, setSidebarTableId] = useState('')
  const [dimensions] = useImageSize(plan)

  let fitRatio = 1

  if (dimensions) {
    fitRatio = (window.innerWidth - 64) / dimensions?.width
    console.log(fitRatio)
  }

  return (
    <>
      <MenuBar>
        <Button onClick={() => setFit(!fit)}>
          <Maximize2 className={!fit ? 'hidden' : 'block'} />
          <Minimize2 className={fit ? 'hidden' : 'block'} />
        </Button>
      </MenuBar>
      <div className="w-fit bg-slate-100 p-8">
        <div
          className="absolute z-10 [transform-origin:top_left]"
          style={{
            width: dimensions?.width,
            height: dimensions?.height,
            transform: fit ? 'scale(' + fitRatio + ')' : 'none',
          }}
        >
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
        </div>
        <Svg className={'bg-white' + (fit ? '' : ' max-w-fit')} source={plan} />
      </div>
      <Sidebar
        className={sidebarTableId ? 'block' : 'hidden'}
        tableId={sidebarTableId}
        closeSidebar={() => setSidebarTableId('')}
      />
    </>
  )
}

export default App
