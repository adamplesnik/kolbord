import { useQuery } from '@tanstack/react-query'
import { HTMLAttributes } from 'react'
import Badge from '../basic/Badge'
import Button from '../basic/Button'
import { PlaceFeatures } from '../place/PlaceFeatures'
import { BookingRecord } from '../../data/BookingRecord'
import { loadTable } from '../../utils/fetchApi'
import PlaceDetailEdit from './PlaceDetailEdit'
import Loading from '../basic/Loading'

const PlaceDetail = ({ tableId, editMode }: PlaceDetailProps) => {
  const {
    data: loadedTable,
    isSuccess,
    isLoading,
  } = useQuery({
    enabled: tableId > 0,
    queryKey: ['table', tableId],
    queryFn: () => loadTable(tableId),
  })

  if (isLoading) {
    return <Loading loading={isLoading} />
  }

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
              <span className="cursor-not-allowed rounded bg-slate-300 py-2 px-4 text-slate-500">
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
            {editMode && <PlaceDetailEdit table={loadedTable.data} />}
          </div>
        ) : (
          'no table selected'
        )}
      </>
    )
  }
}

export type PlaceDetailProps = {
  tableId: number
  bookings: BookingRecord[] | undefined
  editMode: boolean
} & HTMLAttributes<HTMLDivElement>

export default PlaceDetail