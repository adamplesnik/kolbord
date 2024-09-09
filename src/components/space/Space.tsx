import { ArrowRight } from 'lucide-react'
import { MouseEventHandler } from 'react'
import { Tooltip } from 'react-tooltip'
import { TableRecord } from '../../data/TableRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import { humanTime } from '../../utils/humanTime.ts'
import SpaceBookingSlot from './SpaceBookingSlot.tsx'

const Space = ({
  id,
  active,
  className,
  attributes: { available, height, name, rotation, rounded, width, x, y },
  onClick,
  bookedToday = false,
  bookedByWho,
  bookedByMe,
  bookings,
}: SpaceProps) => {
  const initials = (name: string | undefined) => {
    console.log(name)
    if (name) {
      const names = name.split(' ')
      return names.map((n) => Array.from(n)[0])
    }
  }
  const tooltipId = `bookingTooltip_${id}`

  return (
    <>
      <div
        onClick={onClick}
        data-tooltip-id={tooltipId}
        className={
          'group absolute cursor-pointer rounded-full p-6 ring ring-2 transition-colors' +
          addWithSpace(
            active ?
              'z-40 bg-slate-400 ring-slate-600 ring-offset-4 hover:ring-slate-800'
            : 'ring-transparent hover:bg-slate-200 hover:ring-slate-300 hover:ring-offset-4'
          ) +
          addWithSpace(className)
        }
        style={{
          top: y,
          left: x,
        }}
      >
        {available && (
          <SpaceBookingSlot isBooked={bookedToday} isBookedByMe={bookedByMe} large>
            {initials(bookedByWho)}
          </SpaceBookingSlot>
        )}
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
}

export type SpaceProps = {
  active?: boolean | undefined
  onClick?: MouseEventHandler<HTMLDivElement> | undefined
  className?: string | undefined
  bookedToday?: boolean
  bookedByMe?: boolean
  bookedByWho?: string | undefined
  bookings?: any
} & TableRecord

export default Space
