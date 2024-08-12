import { useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { HTMLAttributes, MouseEventHandler } from 'react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { FurnitureFeatures } from '../components/furniture/FurnitureFeatures'
import { BookingRecord } from '../data/BookingRecord'
import { addWithSpace } from '../utils/addWithSpace'
import { loadTable } from '../utils/fetchApi'
import SidebarEdit from './SidebarEdit'

const Sidebar = ({ tableId, className, closeSidebar, editMode }: SidebarProps) => {
  const { data: loadedTable, isSuccess } = useQuery({
    enabled: tableId > 0,
    queryKey: ['table', tableId],
    queryFn: () => loadTable(tableId),
  })

  if (isSuccess) {
    return (
      <div
        className={
          'flex h-screen w-xs shrink-0 flex-col overflow-y-scroll border-l ' +
          addWithSpace(className)
        }
      >
        <div className="sticky top-0 z-10 bg-gradient-to-b from-white/80 from-60% to-transparent pt-2 px-2 pb-4 text-end">
          <Button onClick={closeSidebar} className="self-end">
            <X />
          </Button>
        </div>
        {loadedTable.data ? (
          <div className="flex flex-col gap-8 p-8">
            <div className="sticky top-3 z-10 flex items-center gap-4">
              <span className="text-3xl font-semibold">{loadedTable.data.attributes.name}</span>
              {loadedTable.data.attributes.group.data && (
                <Badge className="text-sm">
                  {loadedTable.data.attributes.group.data.attributes.name}
                </Badge>
              )}
            </div>
            {loadedTable.data.attributes.features.data && (
              <FurnitureFeatures features={loadedTable.data.attributes.features.data} withDesc />
            )}
            {loadedTable.data.attributes.available === false ? (
              <span className="flex items-center gap-2">Not available</span>
            ) : (
              <>
                {/* <div className="flex flex-col gap-8">
                {bookings.map((b, i) => (
                  <SidebarBooking booking={b} key={i} />
                ))}
              </div> */}
                <Button className="sticky bottom-2 w-full" buttonType="primary">
                  Book
                </Button>
              </>
            )}
            {editMode && <SidebarEdit table={loadedTable.data} />}
          </div>
        ) : (
          'no table selected'
        )}
      </div>
    )
  }
}

export type SidebarProps = {
  tableId: number
  bookings: BookingRecord[] | undefined
  closeSidebar: MouseEventHandler
  editMode: boolean
} & HTMLAttributes<HTMLDivElement>

export default Sidebar
