import { UserX, X } from 'lucide-react'
import { HTMLAttributes, MouseEventHandler } from 'react'
import { tables } from '../data/tables'
import { addWithSpace } from '../utils/addWithSpace'
import { getTableId } from '../utils/getTableId'
import Badge from './Badge'
import { FurnitureFeatures } from './furniture/FurnitureFeatures'

const Sidebar = ({ tableId, className, closeSidebar }: SidebarProps) => {
  const table = tables.filter((t) => getTableId(t.name, t.group) === tableId)[0]

  return (
    <div className={'pointer-events-none fixed inset-0 z-50 ' + addWithSpace(className)}>
      <div className="pointer-events-auto fixed top-0 right-0 bottom-0 flex min-w-xs flex-col gap-8 bg-white/80 p-8 shadow-2xl backdrop-blur">
        <button onClick={closeSidebar} className="self-end">
          <X />
        </button>
        {table ? (
          <>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-semibold">{table.name}</span>
              {table.group && <Badge className="text-sm">{table.group}</Badge>}
            </div>
            {table.features && (
              <FurnitureFeatures features={table.features} className="justify-start" withDesc />
            )}
            {table.available === false ? (
              <span className="flex items-center gap-2">
                <UserX />
                Not available
              </span>
            ) : (
              'Book me...'
            )}
          </>
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
