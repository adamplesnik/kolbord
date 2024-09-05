import { Fullscreen, ZoomIn, ZoomOut } from 'lucide-react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'
import { addWithSpace } from '../../utils/addWithSpace'
import Button from '../basic/Button'
import GroupMarkers from '../group-marker/GroupMarkers'
import Places from '../place/Places'
import Plan from './Plan'
import { Value } from './PlanDateSelector'
import MenuBar from '../../partials/MenuBar'

const PlanTransformWrapper = ({
  handlePlaceClick,
  planId,
  sidebarPlanEdit,
  sidebarTableId,
  workingDate,
}: PlanTransformWrapperProps) => {
  const PlanControls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls()

    return (
      <MenuBar position="top">
        <div className="flex">
          <Button onClick={() => zoomIn} Icon={ZoomIn}></Button>
          <Button onClick={() => zoomOut} Icon={ZoomOut}></Button>
          <Button onClick={() => resetTransform} Icon={Fullscreen}></Button>
        </div>
      </MenuBar>
    )
  }

  return (
    <TransformWrapper
      pinch={{ disabled: false }}
      panning={{ wheelPanning: true, disabled: false, allowLeftClickPan: true }}
      initialScale={0.6}
      centerOnInit={true}
      minScale={0.2}
      maxScale={1}
    >
      <>
        <PlanControls />
        <TransformComponent wrapperClass="!h-screen !w-full bg-gradient-to-tr from-zinc-300 to-zinc-100 !p-2">
          <div
            className={
              'relative m-8 rounded-3xl bg-white p-2 outline-[1.5rem] outline-white' +
              addWithSpace(sidebarTableId > 0 || sidebarPlanEdit ? 'mr-[23rem]' : '')
            }
          >
            <GroupMarkers planId={planId} />
            <Places
              sidebarTableId={sidebarTableId}
              handlePlaceClick={handlePlaceClick}
              planId={planId}
              workingDate={workingDate}
            />
            {planId > 0 && <Plan planId={planId} />}
          </div>
        </TransformComponent>
      </>
    </TransformWrapper>
  )
}

type PlanTransformWrapperProps = {
  handlePlaceClick: (id: number) => void
  planId: number
  sidebarPlanEdit: boolean
  sidebarTableId: number
  workingDate: Value
}

export default PlanTransformWrapper
