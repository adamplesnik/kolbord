import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { addWithSpace } from '../../utils/addWithSpace'
import GroupMarkers from '../group/GroupMarkers'
import Spaces from '../space/Spaces'
import Plan from './Plan'
import { Value } from './PlanDateSelector'

const PlanTransformWrapper = ({
  handlePlaceClick,
  listView,
  planId,
  sidebarPlanEdit,
  sidebarTableId,
  workingDate,
}: PlanTransformWrapperProps) => {
  return (
    <TransformWrapper
      pinch={{ disabled: false }}
      panning={{ wheelPanning: true, disabled: false, allowLeftClickPan: true }}
      initialScale={0.6}
      centerOnInit={true}
      minScale={0.2}
      maxScale={1}
    >
      {({ zoomToElement }) => (
        <TransformComponent wrapperClass="!h-screen !w-full !p-2">
          <div
            className={
              'relative m-8 rounded-3xl bg-white p-2 outline-[1.5rem] outline-white' +
              addWithSpace(sidebarTableId > 0 || sidebarPlanEdit ? 'mr-[23rem]' : '')
            }
          >
            <GroupMarkers planId={planId} />
            <Spaces
              handleZoomToElement={zoomToElement}
              sidebarTableId={sidebarTableId}
              handlePlaceClick={handlePlaceClick}
              planId={planId}
              workingDate={workingDate}
              listView={listView}
            />
            {planId > 0 && <Plan planId={planId} />}
          </div>
        </TransformComponent>
      )}
    </TransformWrapper>
  )
}

type PlanTransformWrapperProps = {
  handlePlaceClick: (id: number) => void
  listView: boolean
  planId: number
  sidebarPlanEdit: boolean
  sidebarTableId: number
  workingDate: Value
}

export default PlanTransformWrapper