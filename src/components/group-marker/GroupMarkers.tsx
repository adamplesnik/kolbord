import { useQuery } from '@tanstack/react-query'
import { getToken } from '../../auth/helpers'
import { GroupMarkerRecord } from '../../data/GroupMarkerRecord'
import GroupMarker from './GroupMarker'

const GroupMarkers = ({ planUuid, onMarkerClick }: GroupMarkersProps) => {
  type GroupMarkerQueryType = {
    data: GroupMarkerRecord[]
  }

  const loadMarkers = async (apiPlanUuid: string): Promise<GroupMarkerQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/group-markers?populate[group][fields][0]=name&populate[group][fields][1]=description&fields[0]=x&fields[1]=y&filters[group][plan][uuid][$eq]=${apiPlanUuid}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response.json()
  }

  const { data: markers } = useQuery({
    queryKey: ['markers', planUuid],
    queryFn: () => loadMarkers(planUuid),
  })

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
  planUuid: string
  onMarkerClick: (id: number) => void
}

export default GroupMarkers
