import { ArrowRight } from 'lucide-react'
import { MouseEventHandler } from 'react'
import { Tooltip } from 'react-tooltip'
import { TableRecord } from '../../data/TableRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import SpaceRectangle from './SpaceRectangle.tsx'

const Space = ({
  id,
  active,
  className,
  attributes: { available, height, name, rotation, rounded, width, x, y, chairs },
  onClick,
  bookedToday = false,
  bookedByWho,
  bookings,
  listView,
}: SpaceProps) => {
  const hasChairs = chairs > 0 && chairs
  const humanDate = (date: string) => {
    return new Date(date).toLocaleString([], { hour: '2-digit', minute: '2-digit' })
  }
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
          'absolute inline-flex size-[160px] flex-col items-center justify-between rounded-xl p-px ring-4 transition-colors' +
          addWithSpace(hasChairs && 'pt-2') +
          addWithSpace(available ? 'group cursor-pointer hover:ring-slate-300' : 'opacity-40') +
          addWithSpace(
            active
              ? 'z-40 bg-slate-700 ring-slate-700 ring-offset-4 hover:ring-slate-800'
              : 'ring-transparent'
          ) +
          addWithSpace(className)
        }
        style={{
          top: y,
          left: x,
          width: width,
          height: hasChairs ? height + 64 : height,
          rotate: `${rotation}deg`,
        }}
      >
        {bookedToday && available && (
          <div className="absolute inset-2">
            <div
              className="inline-block rounded-full bg-slate-800 p-2 text-xl text-white"
              style={{ rotate: `${rotation * -1}deg` }}
            >
              {initials(bookedByWho)}
            </div>
          </div>
        )}
        {hasChairs && (
          <SpaceRectangle
            isBooked={bookedToday && available}
            height={40}
            width={40}
            className="rounded-xl"
          />
        )}
        <SpaceRectangle
          isBooked={bookedToday && available}
          height={height}
          width={width}
          className={rounded ? 'rounded-full' : 'rounded-xl'}
        >
          <div
            className="flex flex-col items-center gap-1"
            style={{ rotate: `${rotation * -1}deg` }}
          >
            <div className="flex items-center gap-2">
              <span className={'text-md font-semibold'}>{name}</span>
            </div>
          </div>
        </SpaceRectangle>
      </div>
      {bookings && bookings?.length > 0 && (
        <Tooltip id={tooltipId}>
          {bookings?.map((b: any, i: number) => (
            <div className="flex items-center gap-1" key={`${tooltipId}_${i}`}>
              <div className="flex w-28 items-center justify-evenly gap-1 text-slate-200">
                {humanDate(b.attributes.from)}
                <ArrowRight className="size-4 text-slate-400" strokeWidth={1} />
                {humanDate(b.attributes.to)}
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
  bookedByWho?: string | undefined
  bookings?: any
  listView: boolean
} & TableRecord

export default Space
