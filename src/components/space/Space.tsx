import { ArrowRight } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import { BookingType } from '../../types/bookingType'
import { SpaceType } from '../../types/spaceType'
import { addWithSpace } from '../../utils/addWithSpace'
import { humanTime } from '../../utils/human.ts'
import Button from '../basic/Button.tsx'
import Separator from '../basic/Separator.tsx'
import UserName from '../user/UserName.tsx'
import SpaceDot from './SpaceDot.tsx'

const Space = ({
  id,
  active,
  className,
  x,
  y,
  name,
  // features,
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
            {bookings?.map((b: BookingType, i: number) => (
              <div className="flex items-center gap-1" key={`${tooltipId}_${i}`}>
                <div className="flex w-28 items-center justify-evenly gap-1 text-slate-200">
                  {humanTime(b.from)}
                  <ArrowRight className="size-4 text-slate-400" strokeWidth={1} />
                  {humanTime(b.to)}
                </div>
                <span className="font-semibold">
                  <UserName subject={b.sub} />
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
              bookings?.map((b: BookingType, i: number) => (
                <div className="flex items-center gap-1" key={`${tooltipId}list_${i}`}>
                  <div className="flex w-28 items-center justify-evenly gap-1 text-slate-600">
                    {humanTime(b.from)}
                    <ArrowRight className="size-4 text-slate-400" strokeWidth={1} />
                    {humanTime(b.to)}
                  </div>
                  <span className="font-semibold">
                    <UserName subject={b.sub} />
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

type SpaceProps = {
  active?: boolean | undefined
  bookedByMe?: boolean
  bookedByWho?: string | undefined | null
  bookedToday?: boolean
  bookings?: BookingType[] | undefined
  className?: string | undefined
  listView: boolean
  onClick?: () => void | undefined
} & SpaceType

export default Space
