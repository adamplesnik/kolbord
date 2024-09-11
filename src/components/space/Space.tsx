import { ArrowRight } from 'lucide-react'
import { MouseEventHandler } from 'react'
import { Tooltip } from 'react-tooltip'
import { TableRecord } from '../../data/TableRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import { humanTime } from '../../utils/humanTime.ts'

const Space = ({
  id,
  active,
  className,
  attributes: { x, y },
  onClick,
  bookedToday = false,
  bookedByWho,
  bookedByMe,
  bookings,
  listView,
}: SpaceProps) => {
  const initials = (name: string | undefined) => {
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
        <div
          className={
            'group flex size-16 cursor-pointer items-center justify-center rounded-full border-2 text-2xl font-bold' +
            addWithSpace(
              !bookedToday &&
                'border-slate-500 bg-teal-400 group-hover:border-teal-600 active:bg-teal-600'
            ) +
            addWithSpace(bookedToday && !bookedByMe && 'border-rose-400 bg-rose-300 opacity-80') +
            addWithSpace(
              bookedByMe &&
                'cursor-pointer border-slate-800 bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-900'
            )
          }
        >
          {initials(bookedByWho)}
        </div>
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
  listView: boolean
} & TableRecord

export default Space
