import { HTMLAttributes, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import { SpaceType } from '../../types/spaceType'
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
            <Tooltip id="badge" className="z-50">
              {space.group.value?.description}
            </Tooltip>
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
