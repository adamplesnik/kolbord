import { useQuery } from '@tanstack/react-query'
import { getToken } from '../../auth/helpers'
import { GroupRecord } from '../../data/GroupRecord'

type GroupQueryType = {
  data: GroupRecord[]
}

const loadGroupsForPlan = async (id: number): Promise<GroupQueryType> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/groups?fields[0]=name&fields[1]=description&fields[2]=x&fields[3]=y&fields[4]=showMarker&filters[plan][id][$eq]=${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
  return response.json()
}

export const useGroupsForPlanQuery = (id: number) =>
  useQuery({
    queryKey: ['groups', id],
    enabled: id > 0,
    queryFn: () => loadGroupsForPlan(id),
  })
