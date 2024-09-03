import { useQuery } from '@tanstack/react-query'
import { HTMLAttributes, useState } from 'react'
import { addWithSpace } from '../../utils/addWithSpace'
import { loadTable } from '../../utils/fetchApi'
import Badge from '../basic/Badge'
import Heading from '../basic/Heading'
import Loading from '../basic/Loading'
import PlaceBooking from './PlaceBooking'
import PlaceDetailEdit from './PlaceDetailEdit'
import { PlaceFeatures } from './PlaceFeatures'
import Button from '../basic/Button'
import { Edit } from 'lucide-react'

const PlaceDetail = ({ tableId, workingDate, planId }: PlaceDetailProps) => {
  const [editMode, setEditMode] = useState(false)
  const {
    data: loadedTable,
    isSuccess,
    isLoading,
  } = useQuery({
    enabled: tableId > 0,
    queryKey: ['place', tableId],
    queryFn: () => loadTable(tableId),
  })

  if (isLoading) {
    return <Loading loading={isLoading} />
  }

  if (isSuccess) {
    return (
      <>
        {loadedTable.data ? (
          <div className="flex flex-col gap-6">
            <Button Icon={Edit} onClick={() => setEditMode(!editMode)} />
            <div
              className={
                'sticky top-3 z-10 flex items-center gap-4' +
                addWithSpace(editMode ? 'max-w-40' : 'max-w-52')
              }
            >
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
            {loadedTable.data.attributes.features.data && !editMode && (
              <PlaceFeatures
                className="pb-2"
                features={loadedTable.data.attributes.features.data}
                withDesc
              />
            )}
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
            {editMode && <PlaceDetailEdit table={loadedTable.data} planId={planId} />}
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
} & HTMLAttributes<HTMLDivElement>

export default PlaceDetail
