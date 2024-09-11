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
      <div
        className={
          'flex cursor-pointer items-center gap-2 rounded-lg py-2 px-4' +
          addWithSpace(active ? 'bg-slate-700 text-white' : 'bg-slate-50')
        }
        onClick={onClick}
      >
        <SpaceDot
          bookedByMe={bookedByMe}
          bookedByWho={bookedByWho}
          bookedToday={bookedToday}
          small
        />
        <div className="w-48 shrink-0 text-lg font-medium">{name}</div>
        <div className={'flex w-64 shrink-0 gap-2' + addWithSpace(active ? '*:text-white' : '')}>
          {group.data && <Badge>{group.data.attributes.name}</Badge>}
          {features && (
            <SpaceFeatures badgeClassName={active ? '*:text-white' : ''} features={features.data} />
          )}
        </div>
        <div className="flex flex-wrap items-start gap-x-4 text-sm">
          {bookings &&
            bookings?.length > 0 &&
            bookings?.map((b: any, i: number) => (
              <div className="flex items-center gap-1" key={`${tooltipId}list_${i}`}>
                <div
                  className={
                    'flex w-28 items-center justify-evenly gap-1 ' +
                    addWithSpace(active ? 'text-slate-300' : 'text-slate-600')
                  }
                >
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
        </div>
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
