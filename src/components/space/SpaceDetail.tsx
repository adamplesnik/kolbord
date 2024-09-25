import { HTMLAttributes, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import SpaceBooking from './SpaceBooking.tsx'
import SpaceEdit from './SpaceEdit.tsx'
import { SpaceFeatures } from './SpaceFeatures.tsx'
import { SpaceType } from './spaceType'

const SpaceDetail = ({
  space,
  workingDate,
  handleDelete,
  sendTitle,
  editMode,
}: SpaceDetailProps) => {
  useEffect(() => {
    sendTitle(space.name)
  }, [sendTitle, space.name])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 pt-2">
        {space.group && !editMode && (
          <>
            <span className="text-sm text-slate-600" data-tooltip-id="badge">
              {space.group.value.name}
            </span>
            <Tooltip id="badge" className="z-50">
              {space.group.value.description}
            </Tooltip>
          </>
        )}
        {space.features && !editMode && <SpaceFeatures features={space.features} />}
      </div>
      {!editMode && (
        <SpaceBooking spaceId={space.id} slots={space.slots} workingDate={workingDate} />
      )}
      {editMode && <SpaceEdit table={space} handleDelete={handleDelete} />}
    </div>
  )
}

export type SpaceDetailProps = {
  editMode: boolean
  handleDelete: () => void
  sendTitle: (title: string | undefined) => void
  space: SpaceType
  workingDate: string | undefined
} & HTMLAttributes<HTMLDivElement>

export default SpaceDetail
