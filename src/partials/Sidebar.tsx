import { X } from 'lucide-react'
import { HTMLAttributes, MouseEventHandler } from 'react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { FurnitureFeatures } from '../components/furniture/FurnitureFeatures'
import { Bookings } from '../data/bookings'
import { tables } from '../data/tables'
import { getTableId } from '../utils/getTableId'
import SidebarBooking from './SidebarBooking'
import { addWithSpace } from '../utils/addWithSpace'

const Sidebar = ({ tableId, className, closeSidebar }: SidebarProps) => {
  const table = tables.filter((t) => getTableId(t.name, t.group) === tableId)[0]
  const bookings = Bookings.filter((t) => t.tableId === tableId)

  return (
    <div
      className={
        'pointer-events-auto flex h-screen w-xs shrink-0 flex-col overflow-y-scroll bg-white/60 shadow-2xl backdrop-blur' +
        addWithSpace(className)
      }
    >
      <div className="sticky top-0 z-10 bg-gradient-to-b from-white/80 from-60% to-transparent pt-2 px-2 pb-4 text-end">
        <Button onClick={closeSidebar} className="self-end">
          <X />
        </Button>
      </div>
      {table ? (
        <div className="flex flex-col gap-8 p-8">
          <div className="sticky top-3 z-10 flex items-center gap-4">
            <span className="text-3xl font-semibold">{table.name}</span>
            {table.group && <Badge className="text-sm">{table.group}</Badge>}
          </div>
          {table.features && (
            <FurnitureFeatures features={table.features} className="justify-start" withDesc />
          )}
          {table.available === false ? (
            <span className="flex items-center gap-2">Not available</span>
          ) : (
            <>
              <div className="flex flex-col gap-8">
                {bookings.map((b, i) => (
                  <SidebarBooking booking={b} key={i} />
                ))}
              </div>
              <Button className="sticky bottom-2 w-full" buttonType="primary">
                Book
              </Button>
            </>
          )}
        </div>
      ) : (
        'no table selected'
      )}
    </div>
  )
}

export type SidebarProps = {
  tableId: string | number
  closeSidebar: MouseEventHandler
} & HTMLAttributes<HTMLDivElement>

export default Sidebar
