import { useQuery } from '@tanstack/react-query'
import GroupMarker from '../components/GroupMarker'
import { loadMarkers } from '../utils/fetchApi'

const GroupMarkers = () => {
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
