import { useState } from 'react'
import Svg from './components/Svg'
import WorkTable from './components/furniture/WorkTable'
import plan from '/plan.svg'

export interface TableRecord {
  rotation: 0 | 90 | 180 | 270
  x: number
  y: number
}

const tables: TableRecord[] = [
  {
    rotation: 0,
    x: 158,
    y: 65,
  },
  {
    rotation: 0,
    x: 318,
    y: 65,
  },
]

function App() {
  const [fit, setFit] = useState(false)

  return (
    <div className="relative m-8">
      {tables.map((t, i) => (
        <WorkTable key={i} rotate={t.rotation} x={t.x} y={t.y} />
      ))}
      <Svg className={fit ? 'max-w-fit' : ''} source={plan} />
      <div className="fixed bottom-2 left-2">
        <button onClick={() => setFit(!fit)}>fit?</button>
      </div>
    </div>
  )
}

export default App
