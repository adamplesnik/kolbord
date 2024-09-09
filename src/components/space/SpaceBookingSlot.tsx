import { Trash2 } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { addWithSpace } from '../../utils/addWithSpace'

const SpaceBookingSlot = ({
  bookedBy,
  children,
  isBooked,
  isBookedByMe,
  large = false,
  onClick,
  tooltipId,
  ...props
}: SpaceBookingSlotProps) => {
  return (
    <>
      <div
        onClick={onClick}
        data-tooltip-id={tooltipId}
        className={
          'relative flex items-center justify-center gap-1 overflow-clip rounded-full border p-1 font-medium transition-colors' +
          addWithSpace(large ? 'size-16 border-2 text-lg' : 'h-8 flex-1 text-sm') +
          addWithSpace(
            !isBooked &&
              'group cursor-pointer group-hover:border-teal-800 group-hover:bg-teal-700 group-hover:text-white hover:border-teal-800 hover:bg-teal-700 hover:text-white active:bg-teal-900'
          ) +
          addWithSpace(
            !isBooked && !large ? 'border-slate-300 bg-teal-50'
            : !isBooked && large ? 'border-slate-600 bg-teal-400'
            : ''
          ) +
          addWithSpace(
            isBooked &&
              !isBookedByMe &&
              `border-rose-300 bg-rose-50 ${large ? 'opacity-90' : 'opacity-40'}`
          ) +
          addWithSpace(
            isBookedByMe &&
              'cursor-pointer border-slate-800 bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-900'
          )
        }
        {...props}
      >
        {children}
      </div>

      {isBooked && (
        <Tooltip id={tooltipId}>
          {isBookedByMe ?
            <span className="flex items-center gap-1 text-xs">
              <Trash2 className="size-5" strokeWidth={1} /> Click to unbook.
            </span>
          : <span className="text-xs">{bookedBy}</span>}
        </Tooltip>
      )}
    </>
  )
}

type SpaceBookingSlotProps = {
  bookedBy?: string
  isBooked?: boolean | undefined
  isBookedByMe?: boolean | undefined
  large?: boolean | undefined
  tooltipId?: string
} & HTMLAttributes<HTMLDivElement>

export default SpaceBookingSlot
