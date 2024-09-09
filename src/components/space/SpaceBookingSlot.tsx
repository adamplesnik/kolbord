import { ArrowRight, Trash2 } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { addWithSpace } from '../../utils/addWithSpace'
import { humanTime } from '../../utils/humanTime'

const SpaceBookingSlot = ({
  bookedBy,
  dateFrom,
  dateTo,
  isBooked,
  isBookedByMe,
  onClick,
}: SpaceBookingSlotProps) => {
  const tooltipId = (dateFrom.getTime() + dateTo.getTime()).toString()

  return (
    <>
      <div
        onClick={onClick}
        data-tooltip-id={tooltipId}
        className={
          'relative flex h-8 flex-1 items-center justify-center gap-1 overflow-clip rounded-full border p-1 text-sm font-medium transition-colors' +
          addWithSpace(
            !isBooked &&
              'group cursor-pointer border-slate-300 bg-teal-50 hover:border-teal-800 hover:bg-teal-700 hover:text-white active:bg-teal-900'
          ) +
          addWithSpace(
            isBooked && !isBookedByMe && 'cursor-not-allowed border-rose-300 bg-rose-50 opacity-40'
          ) +
          addWithSpace(
            isBookedByMe &&
              'cursor-pointer border-slate-800 bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-900'
          )
        }
      >
        {humanTime(dateFrom)}
        <ArrowRight className="size-4 text-slate-400 group-hover:text-slate-200" strokeWidth={1} />
        {humanTime(dateTo)}
      </div>

      {isBooked && (
        <Tooltip id={tooltipId}>
          {isBookedByMe ? (
            <span className="flex items-center gap-1 text-xs">
              <Trash2 className="size-5" strokeWidth={1} /> Click to unbook.
            </span>
          ) : (
            <span className="text-xs">{bookedBy}</span>
          )}
        </Tooltip>
      )}
    </>
  )
}

type SpaceBookingSlotProps = {
  bookedBy?: string
  dateFrom: Date
  dateTo: Date
  isBooked?: boolean | undefined
  isBookedByMe?: boolean | undefined
} & HTMLAttributes<HTMLDivElement>

export default SpaceBookingSlot
