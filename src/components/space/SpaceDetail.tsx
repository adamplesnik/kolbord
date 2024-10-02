import { HTMLAttributes, useEffect } from 'react'
import { SpaceType } from '../../types/spaceType'
import CustomTooltip from '../basic/CustomTooltip.tsx'
import SpaceBooking from './SpaceBooking.tsx'
import { SpaceFeatures } from './SpaceFeatures.tsx'

const SpaceDetail = ({ space, workingDate, sendTitle }: SpaceDetailProps) => {
  useEffect(() => {
    sendTitle(space.name)
  }, [sendTitle, space.name])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 pt-2">
        {space.group && (
          <>
            <span className="text-sm text-slate-600" data-tooltip-id="badge">
              {space.group.value?.name}
            </span>
            <CustomTooltip id="badge" className="z-50">
              {space.group.value?.description}
            </CustomTooltip>
          </>
        )}
        {space.features && <SpaceFeatures features={space.features} />}
      </div>
      <SpaceBooking spaceId={space.id} slots={space.slots} workingDate={workingDate} />
    </div>
  )
}

export type SpaceDetailProps = {
  sendTitle: (title: string | undefined) => void
  space: SpaceType
  workingDate: string | undefined
} & HTMLAttributes<HTMLDivElement>

export default SpaceDetail
