import { ArrowRightFromLine, UserRoundCheck } from 'lucide-react'
import { HTMLAttributes, useState } from 'react'
import { TableRecord } from '../../data/TableRecord'
import { Bookings } from '../../data/bookings'
import { addWithSpace } from '../../utils/addWithSpace'
import { getTableId } from '../../utils/getTableId'
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
}: WorkTableProps) => {
  const tableBooking = Bookings.filter((booking) => booking.tableId === getTableId(name, group))

  const [isBooked, setIsBooked] = useState(tableBooking.length > 0)
  console.log(tableBooking[0]?.to?.getHours())

  const time = tableBooking[0]?.to && [
    tableBooking[0].to.getHours(),
    tableBooking[0].to.getMinutes(),
  ]

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
        addWithSpace(available ? 'group cursor-pointer' : 'opacity-20') +
        addWithSpace(rotationClasses[rotation] || '') +
        addWithSpace(className)
      }
      style={{ top: y, left: x }}
    >
      <Chair />
      <Table isBooked={isBooked} className={dimensionClasses[16080]}>
        <div
          className={
            'flex flex-col items-center gap-1' + addWithSpace(contraRotationClasses[rotation] || '')
          }
        >
          <div className="flex items-center gap-2">
            <span className={'text-md font-semibold'}>{name}</span>
            {isBooked && (
              <span className="flex items-center gap-0.5">
                {time?.length && (
                  <>
                    <ArrowRightFromLine className="size-3 opacity-50" />
                    <span className="text-xs">
                      {time[0]}:{time[1]}
                    </span>
                  </>
                )}
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
        <div className="hidden">
          {isBooked ? (
            <UserRoundCheck className="text-neutral-500" strokeWidth={1.5} />
          ) : available ? (
            <span className="rounded-full bg-teal-600 py-1 px-2 text-sm text-white">
              {/* Reserve... */}
            </span>
          ) : (
            ''
          )}
        </div>
      </Table>
    </div>
  )
}

export type WorkTableProps = TableRecord & HTMLAttributes<HTMLDivElement>

export default WorkTable
