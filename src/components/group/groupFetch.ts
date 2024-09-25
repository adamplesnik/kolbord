import { getOldToken } from '../../auth/helpers'

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
