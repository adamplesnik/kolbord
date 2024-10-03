import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import GroupMarkers from '../group/GroupMarkers'
import Spaces from '../space/Spaces'
import Plan from './Plan'

const PlanTransformWrapper = () => {
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
        <TransformComponent wrapperClass="!h-screen">
          <div className={'relative m-8 rounded-3xl bg-white p-2 outline-[1.5rem] outline-white'}>
            <GroupMarkers />
            <Spaces handleZoomToElement={zoomToElement} listView={false} />
            <Plan />
          </div>
        </TransformComponent>
      )}
    </TransformWrapper>
  )
}

export default PlanTransformWrapper
