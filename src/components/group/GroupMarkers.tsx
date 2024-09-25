import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import qs from 'qs'
import { GroupRecord } from '../../data/GroupRecord'
import { useZone } from '../plan/useZone'
import GroupMarker from './GroupMarker'

const GroupMarkers = () => {
  const editMode = false
  const { getToken } = useAuth()
  const { zoneId } = useZone()

  const loadGroupsForPlan = async (
    zoneId: number | undefined
  ): Promise<{ data: { docs: GroupRecord[] } }> => {
    const query = qs.stringify({
      where: {
        'zone.value': {
          equals: zoneId,
        },
      },
    })
    return await axios.get(`${import.meta.env.VITE_API_PAYLOAD_URL}/zone-groups?${query}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })
  }

  const { data: groups } = useQuery({
    queryKey: ['groups', zoneId],
    enabled: zoneId != undefined,
    queryFn: () => loadGroupsForPlan(zoneId),
  })

  return (
    <>
      {groups?.data &&
        groups.data.docs.map(
          (m, i) =>
            m.showMarker && (
              <GroupMarker
                className={editMode ? 'cursor-pointer hover:border-pink-400' : ''}
                key={`group${i}`}
                groupName={m.name}
                groupDescription={m.description}
                x={m.x}
                y={m.y}
              />
            )
        )}
    </>
  )
}

export default GroupMarkers
