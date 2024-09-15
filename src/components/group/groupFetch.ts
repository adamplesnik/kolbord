import { useQuery } from '@tanstack/react-query'
import { getToken } from '../../auth/helpers'
import { GroupRecord } from '../../data/GroupRecord'

const loadGroup = async (groupId: number): Promise<GroupRecord> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/groups/${groupId}?fields[0]=name&fields[1]=description&fields[2]=x&fields[3]=y&fields[4]=showMarker`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
  return response.json()
}

export const useGroupQuery = (groupId: number) =>
  useQuery({
    queryKey: ['group', groupId],
    enabled: groupId > 0,
    queryFn: () => loadGroup(groupId),
  })

const loadGroupsForPlan = async (id: number): Promise<{ data: GroupRecord[] }> => {
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

export const useGroupsForPlanQuery = (planId: number) =>
  useQuery({
    queryKey: ['groups', planId],
    enabled: planId > 0,
    queryFn: () => loadGroupsForPlan(planId),
  })

export const addGroup = async (planId: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/groups`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      data: {
        name: 'New group',
        description: 'Description',
        showMarker: true,
        x: 500,
        y: 500,
        plan: planId,
      },
    }),
  })
  return response.json()
}
