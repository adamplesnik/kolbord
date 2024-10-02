import { HTMLAttributes, useContext } from 'react'
import { SidebarContext, SidebarContextType } from '../../context/SidebarContextProvider.tsx'
import CustomTooltip from '../basic/CustomTooltip.tsx'
import SpaceBooking from './SpaceBooking.tsx'
import { SpaceFeatures } from './SpaceFeatures.tsx'

const SpaceDetail = ({ workingDate }: SpaceDetailProps) => {
  const { sidebarState } = useContext(SidebarContext) as SidebarContextType
  const space = sidebarState.space
  console.log(space)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 pt-2">
        {space?.group && (
          <>
            <span className="text-sm text-slate-600" data-tooltip-id="badge">
              {space.group.value?.name}
            </span>
            <CustomTooltip id="badge" className="z-50">
              {space.group.value?.description}
            </CustomTooltip>
          </>
        )}
        {space?.features && <SpaceFeatures features={space.features} />}
      </div>
      <SpaceBooking workingDate={workingDate} />
    </div>
  )
}

export type SpaceDetailProps = {
  workingDate: string | undefined
} & HTMLAttributes<HTMLDivElement>

export default SpaceDetail
