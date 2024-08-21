import { useQuery } from '@tanstack/react-query'
import { getToken } from '../auth/helpers'
import GroupMarker from '../components/GroupMarker'
import { GroupMarkerRecord } from '../data/GroupMarkerRecord'

const GroupMarkers = ({ planId, onMarkerClick }: GroupMarkersProps) => {
  type GroupMarkerQueryType = {
    data: GroupMarkerRecord[]
  }

  const loadMarkers = async (apiPlanId: number): Promise<GroupMarkerQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/group-markers?populate[group][fields][0]=name&populate[group][fields][1]=description&fields[0]=x&fields[1]=y&filters[group][plan][id][$eq]=${apiPlanId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response.json()
  }

  const { data: markers } = useQuery({
    queryKey: ['markers', planId],
    queryFn: () => loadMarkers(planId),
  })

  console.log(markers, planId)

  return (
    <div>
      {markers?.data.map((m, i) => (
        <GroupMarker
          key={`group${i}`}
          groupName={m.attributes.group.data.attributes.name}
          groupDescription={m.attributes.group.data.attributes.description}
          x={m.attributes.x}
          y={m.attributes.y}
          onClick={() => onMarkerClick(m.id)}
        />
      ))}
    </div>
  )
}

type GroupMarkersProps = {
  planId: number
  onMarkerClick: (id: number) => void
}

export default GroupMarkers
