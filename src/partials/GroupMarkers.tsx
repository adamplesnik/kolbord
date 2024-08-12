import { useQuery } from '@tanstack/react-query'
import GroupMarker from '../components/GroupMarker'
import { GroupMarkerRecord } from '../data/GroupMarkerRecord'

const GroupMarkers = () => {
  type GroupMarkerQueryType = {
    data: GroupMarkerRecord[]
  }

  const loadMarkers = async (): Promise<GroupMarkerQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/group-markers?populate[group][fields][0]=name&fields[0]=x&fields[1]=y`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PRIVATE_READ_ONLY_API_ID}`,
        },
      }
    )
    return response.json()
  }

  const { data: markers } = useQuery({
    queryKey: ['markers'],
    queryFn: loadMarkers,
  })

  return (
    <>
      {markers?.data.map((m, i) => (
        <GroupMarker
          key={`group${i}`}
          groupName={m.attributes.group.data.attributes.name}
          x={m.attributes.x}
          y={m.attributes.y}
        />
      ))}
    </>
  )
}

export default GroupMarkers
