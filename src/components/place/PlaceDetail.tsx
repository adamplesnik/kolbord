import { useQuery } from '@tanstack/react-query'
import { HTMLAttributes } from 'react'
import { loadTable } from '../../utils/fetchApi'
import Badge from '../Badge'
import Heading from '../basic/Heading'
import Loading from '../Loading'
import PlaceBooking from './PlaceBooking'
import PlaceDetailEdit from './PlaceDetailEdit'
import { PlaceFeatures } from './PlaceFeatures'

const PlaceDetail = ({ tableId, editMode, workingDate }: PlaceDetailProps) => {
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
          <div className="flex flex-col gap-10 p-8">
            <div className="sticky top-3 z-10 flex items-center gap-4">
              <Heading size={3}>{loadedTable.data.attributes.name}</Heading>
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
            {loadedTable.data.attributes.available && !editMode && (
              <PlaceBooking
                tableId={tableId}
                slots={loadedTable.data.attributes.slots}
                workingDate={workingDate}
              />
            )}
            {!loadedTable.data.attributes.available && (
              <span className="rounded bg-slate-200 py-2 px-4 text-slate-500">Not available</span>
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
  editMode: boolean
  workingDate: string | undefined
} & HTMLAttributes<HTMLDivElement>

export default PlaceDetail
