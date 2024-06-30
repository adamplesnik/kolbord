import { UserRoundCheck } from 'lucide-react'
import { HTMLAttributes, useState } from 'react'
import { TableRecord } from '../../data/TableRecord'
import { Bookings } from '../../data/bookings'
import { Features } from '../../data/features'
import { addWithSpace } from '../../utils/addWithSpace'
import { getTableId } from '../../utils/getTableId'
import Chair from './atomic/Chair'
import { BookingRecord } from '../../data/BookingRecord'

const WorkTable = ({
  name,
  group,
  rotation = 0,
  x = 0,
  y = 0,
  features,
  className,
}: WorkTableProps) => {
  const tableBooking: BookingRecord[] = Bookings.filter(
    (booking) => booking.tableId === getTableId(name, group)
  )
  const isAvailable = tableBooking[0]?.available != false

  const [isBooked, setIsBooked] = useState(tableBooking.length)

  const rotationClasses: Record<number, string> = {
    90: 'rotate-90',
    180: 'rotate-180',
    270: '-rotate-90',
  }

  const contraRotationClasses: Record<number, string> = {
    90: '-rotate-90 flex-col',
    180: '-rotate-180',
    270: 'rotate-90',
  }

  const dimensionClasses: Record<number, string> = {
    16080: 'h-[78px] w-[158px]',
  }

  return (
    <div
      id={getTableId(name, group)}
      className={
        'absolute inline-flex size-[160px] flex-col items-center justify-between p-px pt-2' +
        addWithSpace(isAvailable ? 'group cursor-pointer' : 'opacity-30') +
        addWithSpace(rotationClasses[rotation] || '') +
        addWithSpace(className)
      }
      style={{ top: y, left: x }}
    >
      <Chair />
      <div
        className={
          'flex items-center justify-center rounded border border-black transition-colors' +
          addWithSpace(dimensionClasses[16080] || '') +
          addWithSpace(
            isBooked
              ? 'border-dashed bg-red-50 group-hover:bg-rose-50'
              : 'bg-zinc-200 group-hover:bg-slate-200'
          )
        }
      >
        <div
          className={
            'flex flex-col items-center justify-center gap-1 p-2' +
            addWithSpace(contraRotationClasses[rotation] || '')
          }
        >
          <span className="text-xs font-semibold">{name}</span>
          {features && (
            <div className="flex gap-0.5">
              {features.map((tableFeature) =>
                Features.map((f, i) =>
                  tableFeature == f.id ? (
                    <>
                      <f.Icon
                        size={18}
                        key={i}
                        aria-label={f.desc}
                        className="text-zinc-500"
                        strokeWidth={1}
                      />
                    </>
                  ) : (
                    ''
                  )
                )
              )}
            </div>
          )}
          {isBooked ? (
            <span className="text-neutral-800">
              <UserRoundCheck />
            </span>
          ) : (
            <span className="rounded-full bg-teal-600 py-1 px-2 text-sm text-white">
              Reserve...
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export type WorkTableProps = TableRecord & HTMLAttributes<HTMLDivElement>

export default WorkTable
