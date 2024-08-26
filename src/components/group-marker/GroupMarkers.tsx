import { useQuery } from '@tanstack/react-query'
import { getToken } from '../../auth/helpers'
import { GroupRecord } from '../../data/GroupRecord'
import GroupMarker from './GroupMarker'

const GroupMarkers = ({ planId, onMarkerClick, editMode }: GroupMarkersProps) => {
  type GroupQueryType = {
    data: GroupRecord[]
  }

  const loadMarkers = async (apiPlanId: number): Promise<GroupQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/groups?fields[0]=name&fields[1]=description&fields[2]=x&fields[3]=y&filters[plan][id][$eq]=${apiPlanId}&filters[showMarker][$eq]=true`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response.json()
  }

  const { data: markers, isSuccess } = useQuery({
    queryKey: ['markers', planId],
    queryFn: () => loadMarkers(planId),
  })

  if (isSuccess) {
    return (
      <div>
        {markers?.data.map((m, i) => (
          <GroupMarker
            className={editMode ? 'cursor-pointer hover:border-pink-400' : ''}
            key={`group${i}`}
            groupName={m.attributes.name}
            groupDescription={m.attributes.description}
            x={m.attributes.x}
            y={m.attributes.y}
            onClick={() => editMode && onMarkerClick(m.id)}
          />
        ))}
      </div>
    )
  }
}

type GroupMarkersProps = {
  planId: number
  onMarkerClick: (id: number) => void
  editMode: boolean
}

export default GroupMarkers
