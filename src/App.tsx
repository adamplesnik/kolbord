import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Svg from './components/Svg'
import WorkTable from './components/furniture/WorkTable'
import { tables } from './data/tables'
import plan from '/plan.svg'
import { getTableId } from './utils/getTableId'

function App() {
  const [fit, setFit] = useState(false)
  const [openSidebar, setOpenSidebar] = useState(false)
  const [sidebarTableId, setSidebarTableId] = useState('')

  return (
    <>
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
        <div className="fixed bottom-2 left-2">
          <button onClick={() => setFit(!fit)}>fit?</button>
        </div>
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
