import { useQuery } from '@tanstack/react-query'
import { HTMLAttributes, useEffect } from 'react'
import { loadTable } from '../../utils/fetchApi'
import Badge from '../basic/Badge'
import Loading from '../basic/Loading'
import SpaceBooking from './SpaceBooking.tsx'
import SpaceEdit from './SpaceEdit.tsx'
import { SpaceFeatures } from './SpaceFeatures.tsx'

const SpaceDetail = ({
  tableId,
  workingDate,
  planId,
  handleDelete,
  sendTitle,
  editMode,
}: SpaceDetailProps) => {
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
        {loadedTable.data ?
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
                <SpaceFeatures features={loadedTable.data.attributes.features.data} />
              )}
            </div>
            {!editMode && (
              <SpaceBooking
                tableId={tableId}
                slots={loadedTable.data.attributes.slots}
                workingDate={workingDate}
              />
            )}
            {editMode && (
              <SpaceEdit table={loadedTable.data} planId={planId} handleDelete={handleDelete} />
            )}
          </div>
        : 'No table selected.'}
      </>
    )
  }
}

export type SpaceDetailProps = {
  tableId: number
  workingDate: string | undefined
  planId: number
  handleDelete: () => void
  sendTitle: (title: string | undefined) => void
  editMode: boolean
} & HTMLAttributes<HTMLDivElement>

export default SpaceDetail
