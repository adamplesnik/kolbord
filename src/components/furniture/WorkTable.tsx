import { UserRoundCheck } from 'lucide-react'
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
        addWithSpace(available ? 'group cursor-pointer' : 'opacity-30') +
        addWithSpace(rotationClasses[rotation] || '') +
        addWithSpace(className)
      }
      style={{ top: y, left: x }}
    >
      <Chair />
      <Table isBooked={isBooked} className={dimensionClasses[16080]}>
        <div
          className={
            'flex flex-col items-center justify-center gap-1 p-2' +
            addWithSpace(contraRotationClasses[rotation] || '')
          }
        >
          <span className="text-xs font-semibold">{name}</span>
          {features && <FurnitureFeatures features={features} />}
          {isBooked || !available ? (
            <UserRoundCheck className="text-neutral-600" />
          ) : (
            <span className="rounded-full bg-teal-600 py-1 px-2 text-sm text-white">
              Reserve...
            </span>
          )}
        </div>
      </Table>
    </div>
  )
}

export type WorkTableProps = TableRecord & HTMLAttributes<HTMLDivElement>

export default WorkTable
