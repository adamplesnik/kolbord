import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import GroupMarkers from '../components/group/GroupMarkers.tsx'
import Plan from '../components/plan/Plan.tsx'
import Spaces from '../components/space/Spaces.tsx'
import Layout from '../partials/Layout.tsx'

const PlanPage = () => {
  return (
    <Layout>
      <TransformWrapper
        pinch={{ disabled: false }}
        panning={{ wheelPanning: true, disabled: false, allowLeftClickPan: true }}
        initialScale={1}
        centerOnInit={true}
        minScale={0.8}
        maxScale={1}
      >
        {({ zoomToElement }) => (
          <TransformComponent wrapperClass="!w-full">
            <div className={'relative m-8 rounded-3xl bg-white p-2 outline-[1.5rem] outline-white'}>
              <GroupMarkers />
              <Spaces handleZoomToElement={zoomToElement} listView={false} />
              <Plan />
            </div>
          </TransformComponent>
        )}
      </TransformWrapper>
    </Layout>
  )
}

export default PlanPage
