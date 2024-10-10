import clsx from 'clsx'
import { useContext } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { EditModeContext, EditModeContextType } from '../../providers/EditModeContextProvider'
import { SidebarContext, SidebarContextType } from '../../providers/SidebarContextProvider'
import GroupMarkers from '../group/GroupMarkers'
import Spaces from '../space/Spaces'
import Plan from '../zone/Zone'

const PlanPage = () => {
  const { editMode } = useContext(EditModeContext) as EditModeContextType
  const { sidebarState } = useContext(SidebarContext) as SidebarContextType
  const sidebarOpen = !!sidebarState.space || editMode

  return (
    <TransformWrapper
      pinch={{ disabled: false }}
      panning={{ wheelPanning: true, disabled: false, allowLeftClickPan: true }}
      initialScale={1}
      centerOnInit={true}
      minScale={0.8}
      maxScale={1}
    >
      {() => (
        <TransformComponent
          wrapperClass="!w-full !h-[calc(100vh_-_4.5rem)]"
          contentClass={clsx('!p-8', sidebarOpen && '!pr-[300px]')}
        >
          <GroupMarkers />
          <Spaces listView={false} />
          <Plan />
        </TransformComponent>
      )}
    </TransformWrapper>
  )
}

export default PlanPage
