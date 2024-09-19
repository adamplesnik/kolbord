import { ArrowRight } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import { BookingRecord } from '../../data/BookingRecord.tsx'
import { TableRecord } from '../../data/TableRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import { humanTime } from '../../utils/human.ts'
import Button from '../basic/Button.tsx'
import Separator from '../basic/Separator.tsx'
import SpaceDot from './SpaceDot.tsx'

const Space = ({
  id,
  active,
  className,
  x,
  y,
  name,
  features,
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
          id={`space_${id.toFixed()}`}
          onClick={onClick}
          data-tooltip-id={tooltipId}
          className={
            'group absolute cursor-pointer rounded-full p-2 ring transition-colors hover:z-50' +
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
          <Tooltip id={tooltipId} className="z-10 text-sm">
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
      <>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="flex items-center gap-2">
            <div onClick={onClick}>
              <SpaceDot
                bookedByMe={bookedByMe}
                bookedByWho={bookedByWho}
                bookedToday={bookedToday}
                small
              />
            </div>
            <div className="flex-1 shrink-0 font-medium lg:w-48">
              <Button onClick={onClick}>{name}</Button>
            </div>
            <div className="flex shrink-0 items-center gap-2 lg:w-64">
              {/* {features && <SpaceFeatures noTooltip features={features.data} />} */}
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-x-4 gap-y-1 text-sm">
            {bookings &&
              bookings?.length > 0 &&
              bookings?.map((b: BookingRecord, i: number) => (
                <div className="flex items-center gap-1" key={`${tooltipId}list_${i}`}>
                  <div className="flex w-28 items-center justify-evenly gap-1 text-slate-600">
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
        <Separator />
      </>
    )
  }
}

export type SpaceProps = {
  active?: boolean | undefined
  onClick?: () => void | undefined
  className?: string | undefined
  bookedToday?: boolean
  bookedByMe?: boolean
  bookedByWho?: string | undefined
  bookings?: any
  listView: boolean
} & TableRecord

export default Space
