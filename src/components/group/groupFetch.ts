import { getOldToken } from '../../auth/helpers'
import { GroupRecord } from '../../data/GroupRecord'

export const addGroup = async (planId: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/groups`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${getOldToken()}`,
      'Content-Type': 'application/json',
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

export const editGroup = async (groupId: number, data: GroupRecord) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/groups/${groupId}`, {
    method: 'put',
    headers: {
      Authorization: `Bearer ${getOldToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        name: data.attributes.name,
        description: data.attributes.description,
        x: data.attributes.x,
        y: data.attributes.y,
        showMarker: data.attributes.showMarker,
      },
    }),
  })
  return response.json()
}
