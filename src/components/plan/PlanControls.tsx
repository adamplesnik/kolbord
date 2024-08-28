import { Fullscreen, ZoomIn, ZoomOut } from 'lucide-react'
import Button from '../basic/Button'

const PlanControls = ({ zoomIn, zoomOut, resetTransform }: PlanControlsProps) => {
  return (
    <div className="flex">
      <Button onClick={zoomIn} Icon={ZoomIn}></Button>
      <Button onClick={zoomOut} Icon={ZoomOut}></Button>
      <Button onClick={resetTransform} Icon={Fullscreen}></Button>
    </div>
  )
}

type PlanControlsProps = {
  zoomIn: () => void
  zoomOut: () => void
  resetTransform: () => void
}

export default PlanControls
