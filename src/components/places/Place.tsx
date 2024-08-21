import { ArrowRight } from 'lucide-react'
import { MouseEventHandler } from 'react'
import bookings from '../../data/bookings.json'
import { TableRecord } from '../../data/TableRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import { isToday } from '../../utils/isToday'
import Chair from './atomic/Chair'
import Table from './atomic/Table'
import { PlaceFeatures } from './PlaceFeatures'

const Place = ({
  active,
  className,
  attributes: { available, features, height, name, rotation, rounded, width, x, y, type },
  onClick,
}: PlaceProps) => {
  const tableBooking = bookings.filter((booking) => booking.tableId === 'adas')

  const now = new Date()
  const bookedToday = isToday(tableBooking[0]?.to) && now < new Date(tableBooking[0]?.to)

  const tableWidth = width
  const tableHeight = height

  const isParking = type === 'parking'

  return (
    <div
      onClick={onClick}
      className={
        'absolute inline-flex size-[160px] flex-col items-center justify-between rounded p-px ring-4 transition-colors' +
        addWithSpace(!isParking && 'pt-2') +
        addWithSpace(available ? 'group cursor-pointer' : 'opacity-20') +
        addWithSpace(active ? 'z-50 bg-slate-200 ring-slate-300' : 'ring-transparent') +
        addWithSpace(className)
      }
      style={{
        top: y,
        left: x,
        width: width,
        height: isParking ? height : height + 64,
        rotate: `${rotation}deg`,
      }}
    >
      {!isParking && <Chair isBooked={bookedToday} />}
      <Table
        isBooked={bookedToday}
        height={tableHeight}
        width={tableWidth}
        className={rounded ? 'rounded-full' : ''}
      >
        <div className="flex flex-col items-center gap-1" style={{ rotate: `${rotation * -1}deg` }}>
          <div className="flex items-center gap-2">
            <span className={'text-md font-semibold'}>{name}</span>
            {bookedToday && tableBooking[0].to && (
              <span className="flex items-center gap-0.5">
                <span className="text-xs">
                  {new Date(tableBooking[0].from).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <ArrowRight className="size-3 opacity-50" />
                <span className="text-xs">
                  {new Date(tableBooking[0].to).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </span>
            )}
          </div>
          {features && <PlaceFeatures features={features?.data} className="max-w-[78px]" />}
        </div>
      </Table>
    </div>
  )
}

export type PlaceProps = {
  active?: boolean | undefined
  onClick?: MouseEventHandler<HTMLDivElement> | undefined
  className?: string | undefined
} & TableRecord

export default Place
