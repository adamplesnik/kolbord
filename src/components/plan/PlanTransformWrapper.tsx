import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { addWithSpace } from '../../utils/addWithSpace'
import GroupMarkers from '../group/GroupMarkers'
import Spaces from '../space/Spaces'
import { SpaceType } from '../space/spaceType'
import Plan from './Plan'
import { Value } from './PlanDateSelector'

const PlanTransformWrapper = ({
  handlePlaceClick,
  sidebarPlanEdit,
  sidebarSpace,
  workingDate,
}: PlanTransformWrapperProps) => {
  return (
    <TransformWrapper
      pinch={{ disabled: false }}
      panning={{ wheelPanning: true, disabled: false, allowLeftClickPan: true }}
      initialScale={1}
      centerOnInit={true}
      minScale={0.8}
      maxScale={1}
    >
      {({ zoomToElement }) => (
        <TransformComponent wrapperClass="!h-screen !w-full !p-2">
          <div
            className={
              'relative m-8 rounded-3xl bg-white p-2 outline-[1.5rem] outline-white' +
              addWithSpace(sidebarSpace || sidebarPlanEdit ? 'mr-[23rem]' : '')
            }
          >
            <GroupMarkers />
            <Spaces
              handleZoomToElement={zoomToElement}
              sidebarSpace={sidebarSpace}
              handlePlaceClick={handlePlaceClick}
              workingDate={workingDate}
              listView={false}
            />
            <Plan />
          </div>
        </TransformComponent>
      )}
    </TransformWrapper>
  )
}

type PlanTransformWrapperProps = {
  handlePlaceClick: (space: SpaceType) => void
  sidebarPlanEdit: boolean
  sidebarSpace: SpaceType | undefined
  workingDate: Value
}

export default PlanTransformWrapper
