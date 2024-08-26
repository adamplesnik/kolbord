import { ArrowRight, Trash2 } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import { addWithSpace } from '../../utils/addWithSpace'

const PlaceBookingSlot = ({
  bookedBy,
  dateFrom,
  dateTo,
  isBooked,
  isBookedByMe,
}: PlaceBookingSlotProps) => {
  const humanDate = (date: Date) => {
    return date.toLocaleString([], { hour: '2-digit', minute: '2-digit' })
  }

  const tooltipId = (dateFrom.getTime() + dateTo.getTime()).toString()

  return (
    <>
      <div
        data-tooltip-id={tooltipId}
        className={
          'group relative flex flex-1 items-center justify-center gap-1 overflow-clip rounded-full border p-1 text-sm font-medium transition-colors' +
          addWithSpace(
            isBooked
              ? 'border-red-400 bg-pink-50'
              : 'cursor-pointer border-slate-300 hover:border-slate-900 hover:bg-slate-800 hover:text-white'
          ) +
          addWithSpace(isBooked && !isBookedByMe && 'opacity-40') +
          addWithSpace(
            isBookedByMe
              ? 'cursor-pointer hover:border-red-500 hover:bg-pink-100'
              : 'cursor-not-allowed'
          )
        }
      >
        {humanDate(dateFrom)}
        <ArrowRight className="size-4 text-slate-400" strokeWidth={1} />
        {humanDate(dateTo)}
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

type PlaceBookingSlotProps = {
  bookedBy?: string
  dateFrom: Date
  dateTo: Date
  isBooked?: boolean | undefined
  isBookedByMe?: boolean | undefined
}

export default PlaceBookingSlot
