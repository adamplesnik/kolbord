import { useQuery } from '@tanstack/react-query'
import { HTMLAttributes } from 'react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { PlaceFeatures } from '../components/place/PlaceFeatures'
import { BookingRecord } from '../data/BookingRecord'
import { loadTable } from '../utils/fetchApi'
import SpaceDetailEdit from './SpaceDetailEdit'

const SpaceDetail = ({ tableId, editMode }: SpaceDetailProps) => {
  const { data: loadedTable, isSuccess } = useQuery({
    enabled: tableId > 0,
    queryKey: ['table', tableId],
    queryFn: () => loadTable(tableId),
  })

  if (isSuccess) {
    return (
      <>
        {loadedTable.data ? (
          <div className="flex flex-col gap-8 p-8">
            <div className="sticky top-3 z-10 flex items-center gap-4">
              <span className="text-3xl font-semibold">{loadedTable.data.attributes.name}</span>
              {loadedTable.data.attributes.group.data && (
                <Badge
                  className="p-1 text-sm"
                  dataTooltipContent={loadedTable.data.attributes.group.data.attributes.description}
                  dataTooltipId="badge"
                >
                  {loadedTable.data.attributes.group.data.attributes.name}
                </Badge>
              )}
            </div>
            {loadedTable.data.attributes.features.data && (
              <PlaceFeatures features={loadedTable.data.attributes.features.data} withDesc />
            )}
            {loadedTable.data.attributes.available === false ? (
              <span className="cursor-not-allowed rounded bg-zinc-300 py-2 px-4 text-zinc-500">
                Not available
              </span>
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
            {editMode && <SpaceDetailEdit table={loadedTable.data} />}
          </div>
        ) : (
          'no table selected'
        )}
      </>
    )
  }
}

export type SpaceDetailProps = {
  tableId: number
  bookings: BookingRecord[] | undefined
  editMode: boolean
} & HTMLAttributes<HTMLDivElement>

export default SpaceDetail
