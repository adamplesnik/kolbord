import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { HTMLAttributes, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import Loading from '../basic/Loading'
import SpaceBooking from './SpaceBooking.tsx'
import SpaceEdit from './SpaceEdit.tsx'
import { SpaceFeatures } from './SpaceFeatures.tsx'
import { SpaceType } from './spaceType'

const SpaceDetail = ({
  spaceId,
  workingDate,
  planId,
  handleDelete,
  sendTitle,
  editMode,
}: SpaceDetailProps) => {
  const { getToken } = useAuth()
  const loadSpace = async (spaceId: number): Promise<{ data: SpaceType }> => {
    return axios.get(`${import.meta.env.VITE_API_PAYLOAD_URL}/spaces/${spaceId}?depth=1`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })
  }

  const {
    data: loadedSpace,
    isSuccess,
    isLoading,
  } = useQuery({
    enabled: spaceId > 0,
    queryKey: ['place', spaceId],
    queryFn: () => loadSpace(spaceId),
  })

  useEffect(() => {
    sendTitle(loadedSpace?.data.name)
  }, [sendTitle, loadedSpace?.data.name])

  if (isLoading) {
    return <Loading loading={isLoading} />
  }

  if (isSuccess && loadedSpace.data) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2 pt-2">
          {loadedSpace.data.group && !editMode && (
            <>
              <span className="text-sm text-slate-600" data-tooltip-id="badge">
                {loadedSpace.data.group.value.name}
              </span>
              <Tooltip id="badge" className="z-50">
                {loadedSpace.data.group.value.description}
              </Tooltip>
            </>
          )}
          {loadedSpace.data.features && !editMode && (
            <SpaceFeatures features={loadedSpace.data.features} />
          )}
        </div>
        {!editMode && (
          <SpaceBooking
            spaceId={spaceId}
            slots={loadedSpace.data.slots}
            workingDate={workingDate}
          />
        )}
        {editMode && (
          <SpaceEdit table={loadedSpace.data} planId={planId} handleDelete={handleDelete} />
        )}
      </div>
    )
  }
}

export type SpaceDetailProps = {
  spaceId: number
  workingDate: string | undefined
  planId: number
  handleDelete: () => void
  sendTitle: (title: string | undefined) => void
  editMode: boolean
} & HTMLAttributes<HTMLDivElement>

export default SpaceDetail
