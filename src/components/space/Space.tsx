import { ArrowRight } from 'lucide-react'
import { MouseEventHandler } from 'react'
import { Tooltip } from 'react-tooltip'
import { TableRecord } from '../../data/TableRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import { humanTime } from '../../utils/humanTime.ts'
import { SpaceFeatures } from './SpaceFeatures.tsx'
import Badge from '../basic/Badge.tsx'
import SpaceDot from './SpaceDot.tsx'

const Space = ({
  id,
  active,
  className,
  attributes: { x, y, name, features, group },
  onClick,
  bookedToday = false,
  bookedByWho,
  bookedByMe,
  bookings,
  listView,
}: SpaceProps) => {
  const tooltipId = `bookingTooltip_${id}`

  if (!listView) {
    return (
      <>
        <div
          onClick={onClick}
          data-tooltip-id={tooltipId}
          className={
            'group absolute cursor-pointer rounded-full p-6 ring transition-colors hover:z-50' +
            addWithSpace(
              active ?
                'z-40 bg-slate-700/50 ring-2 ring-slate-600 ring-offset-4 hover:ring-slate-800'
              : 'ring-4 ring-transparent hover:bg-slate-400/50 hover:ring-white'
            ) +
            addWithSpace(className)
          }
          style={{
            top: y,
            left: x,
          }}
        >
          <SpaceDot bookedByMe={bookedByMe} bookedByWho={bookedByWho} bookedToday={bookedToday} />
        </div>
        {bookings && bookings?.length > 0 && (
          <Tooltip id={tooltipId}>
            {bookings?.map((b: any, i: number) => (
              <div className="flex items-center gap-1" key={`${tooltipId}_${i}`}>
                <div className="flex w-28 items-center justify-evenly gap-1 text-slate-200">
                  {humanTime(b.attributes.from)}
                  <ArrowRight className="size-4 text-slate-400" strokeWidth={1} />
                  {humanTime(b.attributes.to)}
                </div>
                <span className="font-semibold">
                  {b.attributes.users_permissions_user.data.attributes.firstName}{' '}
                  {b.attributes.users_permissions_user.data.attributes.lastName}
                </span>
              </div>
            ))}
          </Tooltip>
        )}
      </>
    )
  } else {
    return (
      <div className={'flex' + addWithSpace(active ? 'bg-red-100' : '')} onClick={onClick}>
        <span className="w-48 text-lg font-medium">{name}</span>
        {group.data && <Badge>{group.data.attributes.name}</Badge>}
        {features && <SpaceFeatures features={features.data} />}
      </div>
    )
  }
}

export type SpaceProps = {
  active?: boolean | undefined
  onClick?: MouseEventHandler<HTMLDivElement> | undefined
  className?: string | undefined
  bookedToday?: boolean
  bookedByMe?: boolean
  bookedByWho?: string | undefined
  bookings?: any
  listView: boolean
} & TableRecord

export default Space
