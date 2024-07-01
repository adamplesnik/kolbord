import { Maximize2, Minimize2 } from 'lucide-react'
import { useState } from 'react'
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
  const [openSidebar, setOpenSidebar] = useState(false)
  const [sidebarTableId, setSidebarTableId] = useState('')

  return (
    <>
      <MenuBar>
        <Button onClick={() => setFit(!fit)}>
          <Maximize2 className={fit ? 'hidden' : 'block'} />
          <Minimize2 className={!fit ? 'hidden' : 'block'} />
        </Button>
      </MenuBar>
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
              setOpenSidebar(true)
              setSidebarTableId(getTableId(t.name, t.group))
            }}
          />
        ))}
        <Svg className={fit ? 'max-w-fit' : ''} source={plan} />
      </div>
      <Sidebar
        className={openSidebar ? 'block' : 'hidden'}
        tableId={sidebarTableId}
        closeSidebar={() => setOpenSidebar(false)}
      />
    </>
  )
}

export default App
