import { useQuery } from '@tanstack/react-query'
import { HTMLAttributes, useEffect } from 'react'
import { loadTable } from '../../utils/fetchApi'
import Badge from '../basic/Badge'
import Loading from '../basic/Loading'
import PlaceBooking from './PlaceBooking'
import PlaceDetailEdit from './PlaceDetailEdit'
import { PlaceFeatures } from './PlaceFeatures'

const PlaceDetail = ({
  tableId,
  workingDate,
  planId,
  handleDelete,
  sendTitle,
  editMode,
}: PlaceDetailProps) => {
  const {
    data: loadedTable,
    isSuccess,
    isLoading,
  } = useQuery({
    enabled: tableId > 0,
    queryKey: ['place', tableId],
    queryFn: () => loadTable(tableId),
  })

  useEffect(() => {
    sendTitle(loadedTable?.data.attributes.name)
  }, [loadedTable?.data.attributes.name])

  if (isLoading) {
    return <Loading loading={isLoading} />
  }

  if (isSuccess) {
    return (
      <>
        {loadedTable.data ? (
          <div className="flex flex-col gap-8">
            <div className="flex gap-2 pt-2">
              {loadedTable.data.attributes.group.data && !editMode && (
                <Badge
                  className="text-sm"
                  dataTooltipContent={loadedTable.data.attributes.group.data.attributes.description}
                  dataTooltipId="badge"
                >
                  {loadedTable.data.attributes.group.data.attributes.name}
                </Badge>
              )}
              {loadedTable.data.attributes.features.data && !editMode && (
                <PlaceFeatures features={loadedTable.data.attributes.features.data} />
              )}
            </div>
            {loadedTable.data.attributes.available && !editMode && (
              <PlaceBooking
                tableId={tableId}
                slots={loadedTable.data.attributes.slots}
                workingDate={workingDate}
              />
            )}
            {!loadedTable.data.attributes.available && !editMode && (
              <span className="rounded bg-slate-200 py-2 px-4 text-slate-500">Not available</span>
            )}
            {editMode && (
              <PlaceDetailEdit
                table={loadedTable.data}
                planId={planId}
                handleDelete={handleDelete}
              />
            )}
          </div>
        ) : (
          'No table selected.'
        )}
      </>
    )
  }
}

export type PlaceDetailProps = {
  tableId: number
  workingDate: string | undefined
  planId: number
  handleDelete: () => void
  sendTitle: (title: string | undefined) => void
  editMode: boolean
} & HTMLAttributes<HTMLDivElement>

export default PlaceDetail
