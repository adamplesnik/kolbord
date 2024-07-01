import { X } from 'lucide-react'
import { HTMLAttributes, MouseEventHandler } from 'react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { FurnitureFeatures } from '../components/furniture/FurnitureFeatures'
import { Bookings } from '../data/bookings'
import { tables } from '../data/tables'
import { addWithSpace } from '../utils/addWithSpace'
import { getTableId } from '../utils/getTableId'
import SidebarBooking from './SidebarBooking'

const Sidebar = ({ tableId, className, closeSidebar }: SidebarProps) => {
  const table = tables.filter((t) => getTableId(t.name, t.group) === tableId)[0]
  const bookings = Bookings.filter((t) => t.tableId === tableId)

  return (
    <div className={'pointer-events-none fixed inset-0 z-50 ' + addWithSpace(className)}>
      <div className="pointer-events-auto fixed top-0 right-0 bottom-0 flex min-w-xs flex-col gap-6 bg-white/80 p-4 shadow-2xl backdrop-blur">
        <Button onClick={closeSidebar} className="self-end">
          <X />
        </Button>
        {table ? (
          <div className="flex flex-col gap-8 p-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-semibold">{table.name}</span>
              {table.group && <Badge className="text-sm">{table.group}</Badge>}
            </div>
            {table.features && (
              <FurnitureFeatures features={table.features} className="justify-start" withDesc />
            )}
            {table.available === false ? (
              <span className="flex items-center gap-2">Not available</span>
            ) : (
              <div className="flex flex-col gap-8">
                {bookings.map((b, i) => (
                  <SidebarBooking booking={b} key={i} />
                ))}
              </div>
            )}
          </div>
        ) : (
          'no table selected'
        )}
      </div>
    </div>
  )
}

export type SidebarProps = {
  tableId: string | number
  closeSidebar: MouseEventHandler
} & HTMLAttributes<HTMLDivElement>

export default Sidebar
