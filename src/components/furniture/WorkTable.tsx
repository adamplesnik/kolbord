import { ArrowRight } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { TableRecord } from '../../data/TableRecord'
import bookings from '../../data/bookings.json'
import { addWithSpace } from '../../utils/addWithSpace'
import { getTableId } from '../../utils/getTableId'
import { isToday } from '../../utils/isToday'
import { FurnitureFeatures } from './FurnitureFeatures'
import Chair from './atomic/Chair'
import Table from './atomic/Table'

const WorkTable = ({
  name,
  group,
  rotation = 0,
  x = 0,
  y = 0,
  available = true,
  features,
  className,
  active,
  onClick,
}: WorkTableProps) => {
  const tableBooking = bookings.filter((booking) => booking.tableId === getTableId(name, group))

  const now = new Date()
  const bookedToday = isToday(tableBooking[0]?.to) && now < new Date(tableBooking[0]?.to)

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
      onClick={onClick}
      id={getTableId(name, group)}
      className={
        'absolute inline-flex size-[160px] flex-col items-center justify-between rounded p-px pt-2 ring-4 transition-colors' +
        addWithSpace(available ? 'group cursor-pointer' : 'opacity-20') +
        addWithSpace(rotationClasses[rotation] || '') +
        addWithSpace(active ? 'z-50 bg-slate-200 ring-slate-300' : 'ring-transparent') +
        addWithSpace(className)
      }
      style={{ top: y, left: x }}
    >
      <Chair isBooked={bookedToday} />
      <Table isBooked={bookedToday} className={dimensionClasses[16080]}>
        <div
          className={
            'flex flex-col items-center gap-1' + addWithSpace(contraRotationClasses[rotation] || '')
          }
        >
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
          {features && (
            <FurnitureFeatures
              features={features}
              className={rotation === 90 || rotation == 270 ? 'max-w-[78px]' : ''}
            />
          )}
        </div>
      </Table>
    </div>
  )
}

export type WorkTableProps = TableRecord & HTMLAttributes<HTMLDivElement>

export default WorkTable
