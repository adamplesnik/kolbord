import { useState } from 'react'
import Svg from './components/Svg'
import WorkTable from './components/furniture/WorkTable'
import plan from '/plan.svg'
import { tables } from './data/tables'

function App() {
  const [fit, setFit] = useState(false)

  return (
    <div className="relative m-8">
      {tables.map((t, i) => (
        <WorkTable
          tableName={t.name}
          tableGroup={t.group}
          available={t.available}
          booked={t.booked}
          key={i}
          rotate={t.rotation}
          x={t.x}
          y={t.y}
        />
      ))}
      <Svg className={fit ? 'max-w-fit' : ''} source={plan} />
      <div className="fixed bottom-2 left-2">
        <button onClick={() => setFit(!fit)}>fit?</button>
      </div>
    </div>
  )
}

export default App
