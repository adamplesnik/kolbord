import { useContext } from 'react'
import { SidebarContext, SidebarContextType } from '../../providers/SidebarContextProvider.tsx'
import CustomTooltip from '../basic/CustomTooltip.tsx'
import SpaceBooking from './SpaceBooking.tsx'
import { SpaceFeatures } from './SpaceFeatures.tsx'

const SpaceDetail = () => {
  const { sidebarState } = useContext(SidebarContext) as SidebarContextType
  const space = sidebarState.space

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        {space?.group && (
          <>
            <span className="text-sm text-zinc-600" data-tooltip-id="badge">
              {space.group.value?.name}
            </span>
            <CustomTooltip id="badge" className="z-50">
              {space.group.value?.description}
            </CustomTooltip>
          </>
        )}
        {space?.features && <SpaceFeatures features={space.features} />}
      </div>
      <SpaceBooking />
    </div>
  )
}

export default SpaceDetail
