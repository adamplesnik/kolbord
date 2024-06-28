import { useState } from 'react'
import Svg from './components/Svg'
import plan from '/plan.svg'

function App() {
  const [fit, setFit] = useState(false)

  return (
    <div className="p-4">
      <Svg className={fit ? 'max-w-fit' : ''} source={plan} />
      <div className="fixed bottom-2 left-2">
        <button onClick={() => setFit(!fit)}>fit?</button>
      </div>
    </div>
  )
}

export default App
